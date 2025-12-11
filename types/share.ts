export interface ShareLinkData {
  id: number
  token: string
  project_name?: string
  cloud_file_url?: string
  password_hash?: string
  expires_at?: string
  is_active: boolean
  created_at: string
}
