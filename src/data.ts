import { CreativeService } from './types';

export const INITIAL_SERVICES: CreativeService[] = [
  {
    id: "serv-logo",
    name: "Logo Design",
    icon: "Sparkles",
    shortDescription: "Distinct, memorable logos custom-crafted to represent your brand's unique ethos.",
    longDescription: "A great logo is the cornerstone of your business identity. Our designers craft modern, versatile, and high-impact logos tailored to resonate with your target demographic. Every logo package delivers standard vector files, light/dark variations, and commercial usage rights.",
    turnaroundTime: "3-5 Business Days",
    packages: {
      basic: {
        name: "Basic Identity",
        price: 2499,
        deliveryTime: "3 Days",
        revisions: "2 Revisions",
        features: ["2 Unique Logo Concepts", "High-res PNG & JPEG formats", "Transparent Backgrounds", "Commercial Rights"]
      },
      standard: {
        name: "Standard Business",
        price: 4999,
        deliveryTime: "4 Days",
        revisions: "5 Revisions",
        features: ["4 Unique Logo Concepts", "Vector Source Files (AI, EPS, SVG, PDF)", "Color Palette & Typography Specs", "Commercial Rights", "Priority Email Support"]
      },
      premium: {
        name: "Elite Corporate",
        price: 9999,
        deliveryTime: "5 Days",
        revisions: "Unlimited Revisions",
        features: ["6 Premium Logo Concepts", "Complete Vector & Raster Package", "Mini Brand Style Guide", "Social Media Cover & Profile Assets", "VIP 1-on-1 Design Session", "Full Intellectual Property Transfer"]
      }
    },
    portfolio: [
      { id: "p-logo-1", title: "Helix BioTech Logo", image: "https://images.unsplash.com/photo-1628348017894-3d88d05e47a0?auto=format&fit=crop&q=80&w=600", description: "Sleek DNA-inspired minimalist geometric logo for an advanced health startup." },
      { id: "p-logo-2", title: "Zenith Coffee Emblem", image: "https://images.unsplash.com/photo-1568649929103-28fffe997658?auto=format&fit=crop&q=80&w=600", description: "Rustic hand-lettered corporate emblem for an artisanal organic roaster chain." }
    ]
  },
  {
    id: "serv-graphic",
    name: "Graphic Design",
    icon: "Palette",
    shortDescription: "Visual marketing collateral including brochures, flyers, banners, and social media posts.",
    longDescription: "Stand out across all digital and print mediums. From captivating social media post templates to detailed multi-page corporate booklets and brochures, we apply strict design principles to make your marketing materials convert attention into business.",
    turnaroundTime: "2-4 Business Days",
    packages: {
      basic: {
        name: "Single Flyer / Banner",
        price: 1199,
        deliveryTime: "2 Days",
        revisions: "3 Revisions",
        features: ["1 Custom Layout Design", "Print-Ready PDF", "Web-Optimized RGB Files", "Royalty-free Stock Images Included"]
      },
      standard: {
        name: "Marketing Collateral Pack",
        price: 3499,
        deliveryTime: "3 Days",
        revisions: "5 Revisions",
        features: ["3 Custom Assets (e.g. Flyer + Brochure + Banner)", "Editable PSD/AI Source Files", "Print & Digital Formats", "Brand Consistency Guarantee"]
      },
      premium: {
        name: "Monthly Social Retainer",
        price: 8999,
        deliveryTime: "Rolling Delivery",
        revisions: "Continuous",
        features: ["15 Beautiful Custom Social Media Posts", "Engaging Caption Briefs", "Matching Story Layouts", "Branded Template Toolkit", "Dedicated Graphic Specialist"]
      }
    },
    portfolio: [
      { id: "p-grap-1", title: "FutureTech Summit Poster", image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600", description: "Bold cyberpunk neon poster layout for a global technology symposium." },
      { id: "p-grap-2", title: "Harvest Foods Brochure", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c3aa?auto=format&fit=crop&q=80&w=600", description: "Elegant, clean earthy-toned editorial brochure highlighting organic supply lines." }
    ]
  },
  {
    id: "serv-branding",
    name: "Corporate Branding",
    icon: "Award",
    shortDescription: "Complete brand guidelines, stationery design, business cards, and identity blueprints.",
    longDescription: "Build a brand that looks professional, cohesive, and deeply trustworthy. Our Corporate Branding package equips you with exhaustive brand guidelines (covering logo rules, primary/secondary color formulas, font pairings, and imagery tones) along with bespoke business cards, letterheads, and corporate presentation decks.",
    turnaroundTime: "5-10 Business Days",
    packages: {
      basic: {
        name: "Starter Identity",
        price: 3999,
        deliveryTime: "5 Days",
        revisions: "3 Revisions",
        features: ["Premium Business Card Layout", "Official Letterhead & Envelope Templates", "Email Signature Layout", "Source Files included"]
      },
      standard: {
        name: "Brand Blueprint",
        price: 9999,
        deliveryTime: "7 Days",
        revisions: "5 Revisions",
        features: ["Starter Stationery Package", "15-Page Brand Guidelines Manual", "Typography hierarchy guidelines", "Logo usage rules (Do/Don't)", "Custom color formulation palette (HEX, RGB, CMYK)"]
      },
      premium: {
        name: "Enterprise Identity System",
        price: 24999,
        deliveryTime: "12 Days",
        revisions: "Unlimited Revisions",
        features: ["Complete Stationery & Presentation Suite", "30-Page Brand Guidelines Book", "Custom Presentation Slide Templates", "Staff ID Card & Badge Designs", "Employee Welcome Kit Box Layout", "Full trademark-ready documentation"]
      }
    },
    portfolio: [
      { id: "p-brand-1", title: "Vesta Hotel Stationery", image: "https://images.unsplash.com/photo-1616628188467-8fb26f6399ca?auto=format&fit=crop&q=80&w=600", description: "Minimalist warm-beige luxury corporate brand stationery and letterheads." }
    ]
  },
  {
    id: "serv-webdev",
    name: "Web Application Development",
    icon: "Code",
    shortDescription: "Highly performant, modern, and pixel-perfect web systems using React/Next.js.",
    longDescription: "Engage your customers with high-performance web solutions. We build lightweight, search-engine-optimized, and highly responsive web applications designed around modern frameworks. Backed by solid architectures, our projects load lightning-fast on mobile and integrate custom databases seamlessly.",
    turnaroundTime: "10-25 Business Days",
    packages: {
      basic: {
        name: "Single Landing Page",
        price: 14999,
        deliveryTime: "10 Days",
        revisions: "3 Revisions",
        features: ["Single Beautiful Page Section", "Responsive Design (Mobile-optimized)", "Contact Form Integration", "Basic SEO Meta Tags", "1 Month Post-launch Support"]
      },
      standard: {
        name: "E-Commerce / Business Portal",
        price: 39999,
        deliveryTime: "18 Days",
        revisions: "5 Revisions",
        features: ["Up to 8 Fully Styled Pages", "Product Catalog / Service list", "Payment Gateway Setup", "Admin CMS Dashboard integration", "Full Analytics & Tag Manager Setup", "3 Months Post-launch Support"]
      },
      premium: {
        name: "Custom Enterprise Platform",
        price: 89999,
        deliveryTime: "30 Days",
        revisions: "Unlimited Revisions",
        features: ["Bespoke Database & Server Setup", "Advanced Role-Based Authentication", "Real-Time dashboards / WebSockets", "Custom RESTful / GraphQL API", "Automated Security Firewalls & Backups", "12 Months Priority Retainer Support"]
      }
    },
    portfolio: [
      { id: "p-web-1", title: "Solaris Solar Panel Dashboard", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600", description: "React real-time telemetry dashboard detailing power grids across India." },
      { id: "p-web-2", title: "OrganicBites E-Grocery App", image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=600", description: "Ultra-fast Next.js storefront supporting instant geo-location delivery tracking." }
    ]
  },
  {
    id: "serv-mobiledev",
    name: "Mobile Application Development",
    icon: "Smartphone",
    shortDescription: "Native-quality cross-platform iOS & Android apps developed with Flutter or React Native.",
    longDescription: "Put your services directly in your customer's pockets. We construct robust cross-platform mobile apps that combine spectacular native design with fluid 60fps animations, background synchronization, push notifications, and hardware sensor integration.",
    turnaroundTime: "15-30 Business Days",
    packages: {
      basic: {
        name: "MVP Mobile Launch",
        price: 24999,
        deliveryTime: "15 Days",
        revisions: "3 Revisions",
        features: ["Clean UI Prototypes", "Cross-Platform Build (Android + iOS)", "Email & Social Signup", "In-App Feedback Forms", "Google Play Store Setup Support"]
      },
      standard: {
        name: "Standard Interactive App",
        price: 54999,
        deliveryTime: "25 Days",
        revisions: "6 Revisions",
        features: ["Custom UI Kit & Interactions", "Real-time Database Connection", "Push Notifications Engine", "In-App Payment integrations", "Apple App Store & Play Store Publishing"]
      },
      premium: {
        name: "Enterprise Custom Mobile",
        price: 119999,
        deliveryTime: "40 Days",
        revisions: "Unlimited Revisions",
        features: ["Full Native Integrations (Camera, Bluetooth, GPS)", "Offline-First Sync Engine", "Complex Backend APIs & Storage", "Multi-Language/Localization", "Dedicated DevOps Pipeline Setup", "1 Year Ongoing Technical Support"]
      }
    },
    portfolio: [
      { id: "p-mob-1", title: "FitPulse Workout Tracker", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600", description: "Sleek biometric-tracking app utilizing watchOS & Android Wear APIs." }
    ]
  }
];
