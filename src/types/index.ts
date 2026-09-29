export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  benefits: string[];
  coverage: string[];
  process: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string; // e.g. ۱۴ اسفند ۱۴۰۴
  readTime: string;
  image: string;
  author: string;
  tags: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  categorySlug: 'international' | 'ecommerce' | 'customs' | 'warehousing';
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
  };
  internalLinks: { text: string; url: string }[];
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: string;
}

export interface ShipmentEvent {
  status: 'order_registered' | 'processing' | 'in_transit' | 'delivered';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface ShipmentData {
  trackingCode: string;
  currentStatus: 'order_registered' | 'processing' | 'in_transit' | 'delivered';
  currentStatusText: string;
  origin: string;
  destination: string;
  sender: string;
  receiver: string;
  packageType: string;
  weightKg: number;
  serviceTier: string;
  carrierVehicle: string;
  dispatchDate: string;
  estimatedDelivery: string;
  events: ShipmentEvent[];
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // تمام وقت / حضوری
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  regNumber: string;
  description: string;
}
