export const BRAND_CONFIG = {
  name: "FAKHAMA DECORAT",
  tagline: "Architectural Living & Curated Objects",
  currency: "IQD",
  subtitle: "A digital showroom dedicated to bespoke materiality, sculptural proportions, and timeless spaces.",
  showroomAddress: "742 Al-Andalus Boulevard, Design District, Riyadh, KSA",
  contact: {
    email: "atelier@fakhamadecorat.com",
    phone: "07517447522",
    whatsapp: "9647517447522",
    hours: "Sat – Thu: 10:00 AM – 9:00 PM (By Appointment & Walk-in)",
  },
  social: {
    instagram: "@fakhamadecorat",
    tiktok: "https://www.tiktok.com/@fakhama_decorat?_r=1&_t=ZS-99Jn6a2X2Qf",
    linkedin: "fakhama-decorat",
  },
  storage: {
    // Cloud storage configurations for direct WhatsApp invoice links
    // Can also be configured via .env (VITE_SUPABASE_URL, VITE_CLOUDINARY_CLOUD_NAME, etc.)
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      bucket: 'invoices',
    },
    cloudinary: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
    },
    customEndpoint: import.meta.env.VITE_CUSTOM_STORAGE_ENDPOINT || '',
  },
  whatsappApi: {
    // WhatsApp Document API provider for sending native PDF document messages
    // Can be configured in .env (VITE_WHATSAPP_INSTANCE_ID, VITE_WHATSAPP_TOKEN)
    provider: (import.meta.env.VITE_WHATSAPP_API_PROVIDER as 'ultramsg' | 'green-api') || 'ultramsg',
    instanceId: import.meta.env.VITE_WHATSAPP_INSTANCE_ID || '',
    token: import.meta.env.VITE_WHATSAPP_TOKEN || '',
  },
  year: 2026,
}
