export const siteConfig = {
  name: "SS Furniture",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ssfurniture.in",
  description:
    "Premium furniture crafted with passion for modern living. Showroom located in Vijayawada, Andhra Pradesh.",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@ssfurniture.in",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@ssfurniture.in",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
  },
  address: {
    street: "MG Road, Near Benz Circle",
    city: "Vijayawada",
    region: "Andhra Pradesh",
    postalCode: "520010",
    country: "IN",
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/ssfurniture",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/ssfurniture",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/ssfurniture",
    pinterest: "https://pinterest.com/ssfurniture",
  },
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
};
