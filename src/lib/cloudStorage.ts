import { BRAND_CONFIG } from '../data/brand'

export interface StorageConfig {
  provider?: 'supabase' | 'cloudinary' | 'custom' | 'auto'
  supabase?: {
    url?: string
    anonKey?: string
    bucket?: string
  }
  cloudinary?: {
    cloudName?: string
    uploadPreset?: string
  }
  customEndpoint?: string
}

/**
 * Uploads a generated invoice PDF Blob to cloud storage and returns the public URL.
 * Supports Supabase Storage, Cloudinary, or custom REST endpoints.
 */
export async function uploadInvoicePDF(
  pdfBlob: Blob,
  fileName: string
): Promise<string | null> {
  try {
    // 1. Check environment variables & Brand config for Supabase
    const supabaseUrl =
      import.meta.env.VITE_SUPABASE_URL ||
      BRAND_CONFIG.storage?.supabase?.url
    const supabaseKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY ||
      BRAND_CONFIG.storage?.supabase?.anonKey
    const supabaseBucket =
      import.meta.env.VITE_SUPABASE_BUCKET ||
      BRAND_CONFIG.storage?.supabase?.bucket ||
      'invoices'

    if (supabaseUrl && supabaseKey) {
      const cleanUrl = supabaseUrl.replace(/\/$/, '')
      const uploadUrl = `${cleanUrl}/storage/v1/object/${supabaseBucket}/${encodeURIComponent(fileName)}`
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
          'Content-Type': 'application/pdf',
          'x-upsert': 'true',
        },
        body: pdfBlob,
      })

      if (response.ok) {
        return `${cleanUrl}/storage/v1/object/public/${supabaseBucket}/${encodeURIComponent(fileName)}`
      } else {
        console.warn('Supabase storage upload returned non-200:', await response.text())
      }
    }

    // 2. Check Cloudinary configuration
    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
      BRAND_CONFIG.storage?.cloudinary?.cloudName
    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
      BRAND_CONFIG.storage?.cloudinary?.uploadPreset

    if (cloudName && uploadPreset) {
      const formData = new FormData()
      formData.append('file', pdfBlob, fileName)
      formData.append('upload_preset', uploadPreset)
      formData.append('public_id', fileName.replace(/\.pdf$/i, ''))

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (res.ok) {
        const data = await res.json()
        if (data.secure_url) {
          return data.secure_url
        }
      } else {
        console.warn('Cloudinary upload returned non-200:', await res.text())
      }
    }

    // 3. Check custom endpoint
    const customEndpoint =
      import.meta.env.VITE_CUSTOM_STORAGE_ENDPOINT ||
      BRAND_CONFIG.storage?.customEndpoint

    if (customEndpoint) {
      const formData = new FormData()
      formData.append('file', pdfBlob, fileName)

      const res = await fetch(customEndpoint, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        if (data.url || data.secure_url || data.fileUrl) {
          return data.url || data.secure_url || data.fileUrl
        }
      }
    }

    // If no external cloud service credentials are provided, return null gracefully
    return null
  } catch (error) {
    console.warn('Cloud PDF upload error:', error)
    return null
  }
}
