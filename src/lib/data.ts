export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  in_stock?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Milano Leather Sofa",
    category: "Sofas",
    price: 199999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Handcrafted Italian leather sofa with ergonomic design and premium cushioning."
  },
  {
    id: 2,
    name: "Oslo Sectional",
    category: "Sofas",
    price: 269999,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    description: "Modern L-shaped sectional perfect for family gatherings and entertainment."
  },
  {
    id: 3,
    name: "Zenith Coffee Table",
    category: "Tables",
    price: 34999,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
    description: "Minimalist oak coffee table with hidden storage compartment."
  },
  {
    id: 4,
    name: "Artisan Dining Table",
    category: "Tables",
    price: 159999,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    description: "Hand-finished walnut dining table seating 8 comfortably."
  },
  {
    id: 5,
    name: "Aria Accent Chair",
    category: "Chairs",
    price: 49999,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    description: "Velvet accent chair with brass-tipped legs and exceptional comfort."
  },
  {
    id: 6,
    name: "Executive Office Chair",
    category: "Chairs",
    price: 29999,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
    description: "Premium ergonomic chair with lumbar support and adjustable armrests."
  },
  {
    id: 7,
    name: "Haven Platform Bed",
    category: "Bedroom",
    price: 179999,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    description: "Low-profile platform bed with integrated nightstands and headboard."
  },
  {
    id: 8,
    name: "Serenity Wardrobe",
    category: "Bedroom",
    price: 229999,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    description: "Walk-in wardrobe system with custom shelving and soft-close drawers."
  },
  {
    id: 9,
    name: "Lumina Floor Lamp",
    category: "Lighting",
    price: 12999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Sculptural brass floor lamp with dimmable LED and marble base."
  },
  {
    id: 10,
    name: "Pendant Cluster Light",
    category: "Lighting",
    price: 18999,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80",
    description: "Modern pendant lighting with three adjustable globes."
  },
  {
    id: 11,
    name: "Nordic Dining Chair",
    category: "Chairs",
    price: 15999,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
    description: "Set of 4 Scandinavian-inspired dining chairs in natural ash."
  },
  {
    id: 12,
    name: "Console Table",
    category: "Tables",
    price: 24999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "Slim console table perfect for entryways with hidden drawer storage."
  }
];

export const categories = ["All", "Sofas", "Tables", "Chairs", "Bedroom", "Lighting"];

export const features = [
  {
    icon: "Truck",
    title: "Free Delivery",
    description: "Complimentary white-glove delivery on all orders above ₹15,000"
  },
  {
    icon: "ShieldCheck",
    title: "10-Year Warranty",
    description: "Extended warranty covering manufacturing defects and craftsmanship"
  },
  {
    icon: "RefreshCw",
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for a full refund"
  },
  {
    icon: "Headphones",
    title: "Expert Support",
    description: "Dedicated design consultants to help you choose"
  }
];
