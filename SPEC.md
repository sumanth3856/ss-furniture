# SS Furniture - Website Specification

## Concept & Vision

SS Furniture is a premium furniture brand that embodies sophistication, quality craftsmanship, and timeless design. The website should feel like stepping into a high-end showroom — luxurious yet approachable, with smooth transitions and attention to every detail. The experience should communicate that SS Furniture isn't just selling furniture; they're selling a lifestyle of refined living.

## Design Language

### Aesthetic Direction
Inspired by Scandinavian minimalism meets Italian luxury. Clean lines, generous whitespace, and a sense of calm sophistication. Every element breathes.

### Color Palette
- **Primary**: `#1A1A1A` (Rich Black) - Typography, buttons, strong accents
- **Secondary**: `#C9A96E` (Warm Gold) - Accent highlights, CTAs, luxury touches
- **Background**: `#FAFAFA` (Off-White) - Primary background
- **Surface**: `#FFFFFF` (Pure White) - Cards, elevated surfaces
- **Text Primary**: `#1A1A1A` (Rich Black)
- **Text Secondary**: `#6B6B6B` (Warm Gray)
- **Accent**: `#2C2C2C` (Charcoal) - Hover states, secondary buttons

### Typography
- **Headings**: `Playfair Display` - Elegant serif for headlines
- **Body**: `Inter` - Clean sans-serif for readability
- **Scale**: Hero 72px → H1 48px → H2 36px → H3 24px → Body 16px → Small 14px

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical, responsive
- Card padding: 24px
- Component gaps: 16px, 24px, 32px
- Max content width: 1280px

### Motion Philosophy
- Subtle, purposeful animations that enhance without distraction
- Entrance animations: fade-up with 0.6s ease-out
- Hover transitions: 0.3s ease
- Page transitions: smooth scroll, elements animate on scroll-into-view
- Micro-interactions on buttons and cards

## Layout & Structure

### Navigation
- **Floating Bottom Pill Navbar** (mobile-first)
  - Glassmorphism effect with backdrop blur
  - Pill-shaped container centered at bottom
  - 5 nav items: Home, Products, About, Contact, Menu
  - Active state: filled background with gold accent
  - Smooth icon scale animation on tap

### Page Structure

#### Home Page
1. **Hero Section**
   - Full-viewport height
   - Large headline with staggered word animation
   - Subtle parallax background
   - CTA button with hover glow effect

2. **Featured Categories**
   - Grid of 3-4 furniture categories
   - Hover reveal with scale and overlay

3. **Featured Products**
   - Horizontal scroll or grid
   - Product cards with image, name, price

4. **Why Choose Us**
   - Icon + text feature blocks
   - Trust indicators

#### Products Page
- Filter bar (categories)
- Grid of product cards
- Each card: image, name, category, price, hover effect

#### About Page
- Brand story section
- Values/philosophy grid
- Team or craftsmanship showcase

#### Contact Page
- Contact form (name, email, message)
- Contact information sidebar
- Map placeholder or decorative element

## Features & Interactions

### Bottom Navigation
- Smooth scroll to sections on home page
- Active link detection based on scroll position
- Menu item opens mobile menu overlay
- Haptic-style visual feedback on tap

### Hero
- Text reveals word-by-word on load
- CTA button pulses subtly
- Scroll indicator bounces

### Product Cards
- Scale up slightly on hover (1.02)
- Shadow elevation increases
- Quick view or add to favorites icon appears

### Contact Form
- Floating labels
- Validation states (error, success)
- Submit button loading state
- Success message animation

## Component Inventory

### BottomNav
- States: default, active, pressed
- Glassmorphism: `backdrop-blur-lg`, semi-transparent white
- Icon + label for each item
- Active indicator: filled circle behind icon

### Button
- Variants: primary (gold), secondary (outlined), ghost
- States: default, hover (glow), active (pressed), disabled
- Sizes: sm, md, lg

### ProductCard
- Image container with aspect ratio
- Info section: name, category, price
- Hover overlay with quick actions

### SectionHeading
- Eyebrow text (small, uppercase, gold)
- Main heading (Playfair Display)
- Optional subtitle

### Input
- Floating label style
- Border animation on focus
- Error state with red border and message

## Technical Approach

### Framework
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons

### Architecture
```
src/
├── app/
│   ├── layout.tsx          # Root layout with BottomNav
│   ├── page.tsx           # Home page
│   ├── products/
│   │   └── page.tsx       # Products listing
│   ├── about/
│   │   └── page.tsx       # About page
│   └── contact/
│       └── page.tsx       # Contact page
├── components/
│   ├── BottomNav.tsx
│   ├── Button.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── SectionHeading.tsx
│   └── Navigation.tsx
└── lib/
    └── data.ts            # Product data
```

### Data
- Static product data with images from Unsplash
- Categories: Sofas, Tables, Chairs, Bedroom, Lighting
