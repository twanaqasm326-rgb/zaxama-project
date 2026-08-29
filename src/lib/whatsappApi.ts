import { BRAND_CONFIG } from '../data/brand'

export interface WhatsAppSendResult {
  success: boolean
  provider?: 'ultramsg' | 'green-api' | 'custom' | 'direct'
  message?: string
  error?: string
}

export interface SendPdfOptions {
  pdfBlob: Blob
  fileName: string
  docNumber: string
  clientName?: string
  clientPhone?: string
  showroomPhone?: string
  caption?: string
}

/**
 * Converts a Blob to a base64 encoded data string.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = reader.result as string
      // Extract pure base64 without data:application/pdf;base64, prefix if needed
      resolve(base64data)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Normalizes phone numbers to international standard with Iraqi code (964...).
 */
export function formatInternationalPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.startsWith('964')) return digits
  if (digits.startsWith('0')) return '964' + digits.slice(1)
  return '964' + digits
}

/**
 * Sends a PDF document directly through a WhatsApp Gateway API (UltraMsg / Green-API)
 * so it appears in WhatsApp as a native PDF file document attachment with preview.
 */
export async function sendPdfDocumentToWhatsApp(
  options: SendPdfOptions
): Promise<WhatsAppSendResult> {
  const {
    pdfBlob,
    fileName,
    docNumber,
    clientName,
    clientPhone,
    showroomPhone = BRAND_CONFIG.contact.phone || '07517447522',
    caption,
  } = options

  const targetPhone = formatInternationalPhone(showroomPhone)

  // UltraMsg configuration
  const ultramsgInstance =
    import.meta.env.VITE_WHATSAPP_INSTANCE_ID ||
    BRAND_CONFIG.whatsappApi?.instanceId
  const ultramsgToken =
    import.meta.env.VITE_WHATSAPP_TOKEN ||
    BRAND_CONFIG.whatsappApi?.token
  const apiProvider =
    import.meta.env.VITE_WHATSAPP_API_PROVIDER ||
    BRAND_CONFIG.whatsappApi?.provider ||
    'ultramsg'

  // 1. UltraMsg Document API (Instant native PDF document delivery)
  if (apiProvider === 'ultramsg' && ultramsgInstance && ultramsgToken) {
    try {
      const base64Data = await blobToBase64(pdfBlob)
      const cleanBase64 = base64Data.split(',')[1] || base64Data

      const docCaption =
        caption ||
        `Invoice #${docNumber} - ${clientName || 'Customer'}${clientPhone ? ` (${clientPhone})` : ''}`

      const params = new URLSearchParams()
      params.append('token', ultramsgToken)
      params.append('to', targetPhone)
      params.append('filename', fileName)
      params.append('document', cleanBase64)
      params.append('caption', docCaption)

      const response = await fetch(
        `https://api.ultramsg.com/${ultramsgInstance}/messages/document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }
      )

      const data = await response.json()
      if (response.ok && (data.sent === 'true' || data.id || data.message === 'ok')) {
        return {
          success: true,
          provider: 'ultramsg',
          message: `PDF invoice ${docNumber} sent directly to WhatsApp!`,
        }
      } else {
        console.warn('UltraMsg response error:', data)
        return {
          success: false,
          error: data.error || data.message || 'Failed to send document via UltraMsg',
        }
      }
    } catch (err) {
      console.error('UltraMsg API error:', err)
      return {
        success: false,
        error: (err as Error).message,
      }
    }
  }

  // 2. Green-API Document API
  if (apiProvider === 'green-api' && ultramsgInstance && ultramsgToken) {
    try {
      const formData = new FormData()
      formData.append('chatId', `${targetPhone}@c.us`)
      formData.append('file', pdfBlob, fileName)
      formData.append('fileName', fileName)
      if (caption) formData.append('caption', caption)

      const response = await fetch(
        `https://api.green-api.com/waInstance${ultramsgInstance}/sendFileByUpload/${ultramsgToken}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()
      if (response.ok && data.idMessage) {
        return {
          success: true,
          provider: 'green-api',
          message: `PDF invoice ${docNumber} sent directly to WhatsApp!`,
        }
      } else {
        return {
          success: false,
          error: data.message || 'Failed to send document via Green-API',
        }
      }
    } catch (err) {
      console.error('Green-API error:', err)
      return {
        success: false,
        error: (err as Error).message,
      }
    }
  }

  // Fallback: If no API token is configured yet, return unconfigured status
  return {
    success: false,
    provider: 'direct',
    message: 'API credentials not configured yet.',
  }
}
