export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier: number; // added to base price
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  mockupImage: string; // URL of the base product mockup
  overlayArea: {
    top: number; // percentage from top (0-100)
    left: number; // percentage from left (0-100)
    width: number; // percentage width
    height: number; // percentage height
    borderRadius?: string;
  };
  variants: ProductVariant[];
  variantLabel: string; // e.g. "Size", "Frame Dimension"
  estimatedDelivery: string;
  reviews: Review[];
  rating: number;
  featured?: boolean;
}

export interface ServicePackage {
  name: string; // e.g., Basic, Standard, Premium
  price: number;
  deliveryTime: string;
  revisions: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface CreativeService {
  id: string;
  name: string;
  icon: string; // name of lucide-react icon
  shortDescription: string;
  longDescription: string;
  packages: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
  portfolio: PortfolioItem[];
  turnaroundTime: string;
}

export interface CustomizedDesign {
  text: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  textX: number; // percentage position (-100 to 100 relative to center)
  textY: number;
  imageSrc: string | null; // Base64 or object URL of uploaded custom image
  imageScale: number; // 0.1 to 3
  imageX: number;
  imageY: number;
}

export interface ServiceInquiry {
  id: string;
  serviceId: string;
  serviceName: string;
  packageName: string;
  packagePrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectBrief: string;
  budget: string;
  attachmentName: string | null;
  attachmentData: string | null; // base64 representation if uploaded
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Booked';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  attachmentName: string | null;
  createdAt: string;
  status: 'New' | 'Replied' | 'Archived';
}

export interface ProductInquiry {
  id: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  customText: string;
  customColor: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Replied';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
}

