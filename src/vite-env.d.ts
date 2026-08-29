/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SUPABASE_BUCKET?: string
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string
  readonly VITE_CUSTOM_STORAGE_ENDPOINT?: string
  readonly VITE_WHATSAPP_API_PROVIDER?: string
  readonly VITE_WHATSAPP_INSTANCE_ID?: string
  readonly VITE_WHATSAPP_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
