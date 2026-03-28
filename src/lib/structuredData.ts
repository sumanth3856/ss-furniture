import { products } from "@/lib/data";

export function generateProductStructuredData() {
  return products.slice(0, 6).map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "SS Furniture",
    },
  }));
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SS Furniture",
    url: "https://ssfurniture.in",
    logo: "https://ssfurniture.in/logo.svg",
    description: "Premium furniture crafted with passion for modern living. Showroom located in Vijayawada, Andhra Pradesh.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "MG Road, Near Benz Circle",
      addressLocality: "Vijayawada",
      addressRegion: "Andhra Pradesh",
      postalCode: "520010",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
      availableLanguage: ["English", "Telugu", "Hindi"],
    },
    sameAs: [
      "https://facebook.com/ssfurniture",
      "https://instagram.com/ssfurniture",
      "https://pinterest.com/ssfurniture",
    ],
  };
}

export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SS Furniture",
    url: "https://ssfurniture.in",
    description: "Premium furniture crafted with passion for modern living.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ssfurniture.in/products?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
