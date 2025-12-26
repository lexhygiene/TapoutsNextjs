export interface NavItem {
    label: string;
    path: string;
}

export interface MembershipTier {
    name: string;
    subtitle?: string;
    description?: string;
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

export interface Base {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface Post extends Base {
    author: Author;
    body: Block[];
    categories: Category[];
    mainImage: Image;
    cloudinaryImage?: {
        url: string;
        alt: string;
    };
    slug: Slug;
    title: string;
    description: string;
    publishedAt: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export interface Author extends Base {
    bio: Block[];
    image: Image;
    name: string;
    slug: Slug;
}

export interface Image {
    _type: 'image';
    asset: Reference;
}

export interface Reference {
    _ref: string;
    _type: 'reference';
}

export interface Slug {
    _type: 'slug';
    current: string;
}

export interface Block {
    _key: string;
    _type: 'block';
    children: Span[];
    markDefs: any[];
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

export interface Span {
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
}

export interface Category extends Base {
    description: string;
    title: string;
}

export interface MembershipTier {
    name: string;
    subtitle?: string;
    description?: string;
    price: string;
    period: string;
    bestFor: string;
    benefits: string[];
    recommended?: boolean;
    icon?: React.ElementType;
}
