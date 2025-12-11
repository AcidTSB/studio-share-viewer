import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const { password } = await request.json()

    // Get share link from Supabase
    const { data: link, error } = await supabase
      .from('share_links')
      .select('*')
      .eq('token', token)
      .single()

    if (error || !link) {
      return NextResponse.json({ success: false, error: 'Share link not found' }, { status: 404 })
    }

    // Check if link is active
    if (!link.is_active) {
      return NextResponse.json(
        { success: false, error: 'Share link has been revoked' },
        { status: 403 }
      )
    }

    // Check expiration
    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return NextResponse.json({ success: false, error: 'Share link has expired' }, { status: 410 })
    }

    // Verify password
    if (!link.password_hash) {
      return NextResponse.json(
        { success: false, error: 'This link does not require a password' },
        { status: 400 }
      )
    }

    const isValid = await bcrypt.compare(password, link.password_hash)

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
    }

    return NextResponse.json({ success: true, data: link })
  } catch (error) {
    console.error('Password verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify password' },
      { status: 500 }
    )
  }
}
