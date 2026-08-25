// Central, editable site configuration.
// Replace placeholder values with real business information before launch.
// Sensitive/production values should come from environment variables.

export const siteConfig = {
  brand: {
    name: 'DigitalAI Learning Institute',
    shortName: 'DigitalAI Learning',
    tagline: 'Learn Digital. Master AI. Build Your Future.',
    domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitalailearning.example',
  },

  // Business model: ONLINE + OFFLINE — DigitalAI now has a physical centre in Noida.
  operationMode: 'online_offline' as 'online_only' | 'online_offline',

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@digitalai.in',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9310378799',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919310378799', // E.164, no +/spaces
    whatsappDefaultMessage:
      'Hi DigitalAI Learning Institute, I would like to know more about your courses.',
    businessHours: 'Mon–Sat, 10:00 AM – 7:00 PM IST', // TODO: confirm
    address: 'Noida, Uttar Pradesh, India', // TODO: replace with full street address
    mapEmbedUrl:
      process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
      'https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed',
  },

  social: {
    instagram: '', // TODO
    linkedin: '', // TODO
    youtube: '', // TODO
    facebook: '', // TODO
  },

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '', // TODO: set in .env, do not hardcode
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  },

  // Cities used only for "learn from anywhere" messaging — NOT physical branches.
  studentCities: [
    'Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune',
    'Chennai', 'Kolkata', 'Noida', 'Lucknow', 'Jaipur',
  ],
};

export type SiteConfig = typeof siteConfig;
