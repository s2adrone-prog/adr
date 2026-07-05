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
