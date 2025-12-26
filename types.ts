export interface NavItem {
  label: string;
  path: string;
}

export interface MembershipTier {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  benefits: string[];
  recommended?: boolean;
  icon?: React.ElementType;
}

export interface ServiceCategory {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  content: string;
  date: string;
  featuredImage?: string;
  category?: string;
  isFeatured?: boolean;
}
