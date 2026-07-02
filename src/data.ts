import { Product, CreativeService, Coupon } from './types';

export const INITIAL_CATEGORIES = [
  "Customized T-Shirts",
  "Customized Tiles",
  "Customized Mugs",
  "Customized Sipper Bottles",
  "Customized Keyrings",
  "Customized Crystal Photo Frames",
  "Customized Crystal Table Clocks",
  "Customized MDF Sheet Prints",
  "Customized Metal Sheet Prints"
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-tshirt-1",
    name: "ADR Custom Premium Tee",
    category: "Customized T-Shirts",
    description: "100% combed ringspun cotton premium t-shirt. Soft-feel, breathable, and perfect for high-definition digital customization. Available in rich colors with a crew neckline.",
    basePrice: 599,
    mockupImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 25,
      left: 32,
      width: 36,
      height: 42,
      borderRadius: "4px"
    },
    variants: [
      { id: "v-ts-s", name: "S (Small)", priceModifier: 0 },
      { id: "v-ts-m", name: "M (Medium)", priceModifier: 0 },
      { id: "v-ts-l", name: "L (Large)", priceModifier: 0 },
      { id: "v-ts-xl", name: "XL (Extra Large)", priceModifier: 50 },
      { id: "v-ts-xxl", name: "XXL (Double Extra Large)", priceModifier: 90 }
    ],
    variantLabel: "Size",
    estimatedDelivery: "3-5 Business Days",
    featured: true,
    rating: 4.8,
    reviews: [
      { id: "r-1", userName: "Arun Kumar", rating: 5, comment: "Extremely high-quality printing! The cotton is so soft and the design looks vivid even after 5 washes.", date: "2026-06-15" },
      { id: "r-2", userName: "Sarah D'Souza", rating: 4, comment: "Fits perfectly. The online customization tool is very accurate and easy to use.", date: "2026-06-10" }
    ]
  },
  {
    id: "prod-mug-1",
    name: "Classic Ceramic Custom Mug",
    category: "Customized Mugs",
    description: "High-grade white ceramic mug with an easy-grip C-handle. Microwave and dishwasher safe. Ideal for personalized photos, workplace slogans, or family logos.",
    basePrice: 299,
    mockupImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 25,
      left: 28,
      width: 40,
      height: 45,
      borderRadius: "2px"
    },
    variants: [
      { id: "v-mug-11", name: "Standard 11oz", priceModifier: 0 },
      { id: "v-mug-15", name: "Large 15oz", priceModifier: 100 },
      { id: "v-mug-magic", name: "Magic Color Changing (11oz)", priceModifier: 180 }
    ],
    variantLabel: "Mug Type",
    estimatedDelivery: "2-4 Business Days",
    featured: true,
    rating: 4.9,
    reviews: [
      { id: "r-3", userName: "Rohan Sharma", rating: 5, comment: "I ordered the magic mug and the way the image uncovers with hot water is magical!", date: "2026-06-20" }
    ]
  },
  {
    id: "prod-tile-1",
    name: "Glossy Sublimation Ceramic Tile",
    category: "Customized Tiles",
    description: "Exquisite ceramic tile with a high-gloss sublimation coating. Delivers incredibly vibrant colors and sharp details. Includes a sleek display stand for shelves, desks, or mantles.",
    basePrice: 449,
    mockupImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 15,
      left: 20,
      width: 60,
      height: 70
    },
    variants: [
      { id: "v-tile-4", name: "4\" x 4\" Desktop Size", priceModifier: 0 },
      { id: "v-tile-6", name: "6\" x 6\" Showcase Size", priceModifier: 150 },
      { id: "v-tile-8", name: "8\" x 8\" Premium Size", priceModifier: 300 }
    ],
    variantLabel: "Tile Dimension",
    estimatedDelivery: "4-6 Business Days",
    featured: false,
    rating: 4.6,
    reviews: [
      { id: "r-4", userName: "Pooja Hegde", rating: 4, comment: "Beautiful desk souvenir. Color translation is precise and vibrant. Stand is sturdy.", date: "2026-05-28" }
    ]
  },
  {
    id: "prod-bottle-1",
    name: "Aluminium Custom Sipper Bottle",
    category: "Customized Sipper Bottles",
    description: "Lightweight, durable, sport-grade aluminium sipper bottle. Comes with a handy carabiner clip for easy travel. Great for gyms, offices, sports, and outdoor activities.",
    basePrice: 399,
    mockupImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 30,
      left: 35,
      width: 30,
      height: 45,
      borderRadius: "4px"
    },
    variants: [
      { id: "v-bot-600", name: "600ml Sports Cap", priceModifier: 0 },
      { id: "v-bot-750", name: "750ml Straw Lid", priceModifier: 120 }
    ],
    variantLabel: "Volume & Lid Style",
    estimatedDelivery: "3-5 Business Days",
    featured: true,
    rating: 4.7,
    reviews: [
      { id: "r-5", userName: "Vikram Sen", rating: 5, comment: "Keeps liquids secure and the custom quote I printed looks very premium.", date: "2026-06-12" }
    ]
  },
  {
    id: "prod-keyring-1",
    name: "Double-Sided Premium Keyring",
    category: "Customized Keyrings",
    description: "Heavy-duty polished metal keyring with high-grade printed inserts. Scratch-resistant acrylic dome covers protect your designs on both sides.",
    basePrice: 149,
    mockupImage: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 30,
      left: 28,
      width: 44,
      height: 44,
      borderRadius: "50%"
    },
    variants: [
      { id: "v-key-circ", name: "Classic Circular", priceModifier: 0 },
      { id: "v-key-rect", name: "Sleek Rectangular", priceModifier: 20 },
      { id: "v-key-heart", name: "Romantic Heart-Shaped", priceModifier: 40 }
    ],
    variantLabel: "Shape Accent",
    estimatedDelivery: "2-3 Business Days",
    featured: false,
    rating: 4.5,
    reviews: [
      { id: "r-6", userName: "Sneha Patil", rating: 4, comment: "Ordered 10 keyrings for my design team. Perfect little branding items.", date: "2026-06-18" }
    ]
  },
  {
    id: "prod-frame-1",
    name: "Luxe Crystal Photo Frame",
    category: "Customized Crystal Photo Frames",
    description: "Thick, high-optical-purity solid crystal photo frame. Features precision beveled edges that refract light beautifully. Photos are fused permanently inside the glass structure.",
    basePrice: 899,
    mockupImage: "https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 15,
      left: 18,
      width: 64,
      height: 70,
      borderRadius: "8px"
    },
    variants: [
      { id: "v-cry-sm", name: "5\" x 7\" Desktop Crystal", priceModifier: 0 },
      { id: "v-cry-md", name: "6\" x 8\" Grand Crystal", priceModifier: 300 },
      { id: "v-cry-lg", name: "8\" x 10\" Majestic Crystal", priceModifier: 700 }
    ],
    variantLabel: "Dimensions",
    estimatedDelivery: "5-7 Business Days",
    featured: true,
    rating: 4.9,
    reviews: [
      { id: "r-7", userName: "Diana Rose", rating: 5, comment: "An absolutely stunning gift! The light catch on the beveled edges makes the photograph look breathtaking.", date: "2026-06-25" }
    ]
  },
  {
    id: "prod-clock-1",
    name: "Engraved Crystal Table Clock",
    category: "Customized Crystal Table Clocks",
    description: "An elegant combination of a high-accuracy gold-bezeled quartz clock embedded in a customized beveled solid crystal prism. A supreme corporate retirement, wedding, or anniversary gift.",
    basePrice: 1299,
    mockupImage: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 40,
      left: 20,
      width: 60,
      height: 48,
      borderRadius: "4px"
    },
    variants: [
      { id: "v-cl-sq", name: "Symmetric Square Prism", priceModifier: 0 },
      { id: "v-cl-arc", name: "Sleek Semi-Circular Arch", priceModifier: 200 }
    ],
    variantLabel: "Crystal Arch",
    estimatedDelivery: "5-8 Business Days",
    featured: false,
    rating: 4.7,
    reviews: [
      { id: "r-8", userName: "George Mathew", rating: 5, comment: "Classy desk centerpiece. The embedded clock ticks perfectly, and the photo printing is clean.", date: "2026-05-14" }
    ]
  },
  {
    id: "prod-mdf-1",
    name: "Textured MDF Sheet Photo Print",
    category: "Customized MDF Sheet Prints",
    description: "Custom photo print on highly durable, eco-friendly Medium Density Fiberboard (MDF). Features a subtle matte texture that reduces reflections. Ready-to-hang wooden feel.",
    basePrice: 349,
    mockupImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 15,
      left: 20,
      width: 60,
      height: 70,
      borderRadius: "4px"
    },
    variants: [
      { id: "v-mdf-8", name: "8\" x 12\" Standard Wood", priceModifier: 0 },
      { id: "v-mdf-12", name: "12\" x 18\" Medium Wood", priceModifier: 250 },
      { id: "v-mdf-16", name: "16\" x 24\" Cinematic Wood", priceModifier: 550 }
    ],
    variantLabel: "Panel Size",
    estimatedDelivery: "3-6 Business Days",
    featured: false,
    rating: 4.6,
    reviews: [
      { id: "r-9", userName: "Ankita Roy", rating: 4, comment: "Love the warm, organic wood feel it brings to our living room wall.", date: "2026-06-22" }
    ]
  },
  {
    id: "prod-metal-1",
    name: "Ultra HD Metal Sheet Print",
    category: "Customized Metal Sheet Prints",
    description: "High-definition photo prints fused directly into specially coated aluminum sheets. Incredible depth, luminescence, and modern frameless display. Water and scratch resistant.",
    basePrice: 799,
    mockupImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    overlayArea: {
      top: 10,
      left: 15,
      width: 70,
      height: 80,
      borderRadius: "6px"
    },
    variants: [
      { id: "v-met-8", name: "8\" x 10\" Brushed Aluminium", priceModifier: 0 },
      { id: "v-met-12", name: "12\" x 16\" Architectural Grade", priceModifier: 400 },
      { id: "v-met-18", name: "18\" x 24\" Gallery Master", priceModifier: 950 }
    ],
    variantLabel: "Metal Panel Size",
    estimatedDelivery: "4-7 Business Days",
    featured: true,
    rating: 4.8,
    reviews: [
      { id: "r-10", userName: "Kabir Mehta", rating: 5, comment: "Absolutely breathtaking resolution and glossy shine. High-tech look for our office lobby.", date: "2026-06-29" }
    ]
  }
];

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
      { id: "p-logo-1", title: "Helix BioTech Logo", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600", description: "Sleek DNA-inspired minimalist geometric logo for an advanced health startup." },
      { id: "p-logo-2", title: "Zenith Coffee Emblem", image: "https://images.unsplash.com/photo-1524168204150-6126de4dd1a2?auto=format&fit=crop&q=80&w=600", description: "Rustic hand-lettered corporate emblem for an artisanal organic roaster chain." }
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
      { id: "p-grap-1", title: "FutureTech Summit Poster", image: "https://images.unsplash.com/photo-1547891654-e66ed7edd96c?auto=format&fit=crop&q=80&w=600", description: "Bold cyberpunk neon poster layout for a global technology symposium." },
      { id: "p-grap-2", title: "Harvest Foods Brochure", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600", description: "Elegant, clean earthy-toned editorial brochure highlighting organic supply lines." }
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
      { id: "p-brand-1", title: "Vesta Hotel Stationery", image: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?auto=format&fit=crop&q=80&w=600", description: "Minimalist warm-beige luxury corporate brand stationery and letterheads." }
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
      { id: "p-web-1", title: "Solaris Solar Panel Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", description: "React real-time telemetry dashboard detailing power grids across India." },
      { id: "p-web-2", title: "OrganicBites E-Grocery App", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", description: "Ultra-fast Next.js storefront supporting instant geo-location delivery tracking." }
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
      { id: "p-mob-1", title: "FitPulse Workout Tracker", image: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=600", description: "Sleek biometric-tracking app utilizing watchOS & Android Wear APIs." }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: "ADR10", discountType: "percentage", value: 10, minSpend: 499 },
  { code: "WELCOME15", discountType: "percentage", value: 15 },
  { code: "SUPER500", discountType: "fixed", value: 500, minSpend: 2999 },
  { code: "FESTIVE25", discountType: "percentage", value: 25, minSpend: 1000 }
];
