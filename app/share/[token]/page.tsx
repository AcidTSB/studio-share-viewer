import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { AudioPlayer } from '@/components/AudioPlayer'
import { PasswordForm } from '@/components/PasswordForm'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Music } from 'lucide-react'
import type { ShareLinkData } from '@/types/share'

async function getShareData(token: string): Promise<ShareLinkData | null> {
  const { data, error } = await supabase.from('share_links').select('*').eq('token', token).single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function SharePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ verified?: string }>
}) {
  const { token } = await params
  const { verified } = await searchParams

  const shareData = await getShareData(token)

  if (!shareData) {
    notFound()
  }

  // Check if link is active
  if (!shareData.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Share Link Revoked</h1>
          <p className="text-gray-600">This share link has been deactivated by the owner.</p>
        </div>
      </div>
    )
  }

  // Check expiration
  if (shareData.expires_at && new Date(shareData.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Share Link Expired</h1>
          <p className="text-gray-600">
            This share link expired on {new Date(shareData.expires_at).toLocaleDateString()}.
          </p>
        </div>
      </div>
    )
  }

  // Check if password is required and not verified
  const needsPassword = shareData.password_hash && !verified

  if (needsPassword) {
    return <PasswordForm token={token} onSuccess={() => {}} />
  }

  // Show audio player
  if (!shareData.cloud_file_url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Content Not Available</h1>
          <p className="text-gray-600">The audio file for this share link is not available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {shareData.project_name || 'Shared Audio'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Shared {formatDistanceToNow(new Date(shareData.created_at))} ago</span>
          </div>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          audioUrl={shareData.cloud_file_url}
          trackName={shareData.project_name || 'Untitled Track'}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by Studio Share</p>
        </div>
      </div>
    </div>
  )
}
