# Tapouts Website - Complete Code Structure Documentation

> **Purpose**: This document provides a comprehensive guide to the Tapouts website codebase for developers who need to make edits or understand how the system works.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Root Configuration Files](#root-configuration-files)
5. [App Directory (Pages & Routes)](#app-directory-pages--routes)
6. [Components](#components)
7. [Sanity CMS Integration](#sanity-cms-integration)
8. [Utility Files](#utility-files)
9. [Scripts](#scripts)
10. [Environment Variables](#environment-variables)
11. [Common Editing Tasks](#common-editing-tasks)

---

## Project Overview

The Tapouts website is a **Next.js 16** application with **Sanity CMS** as the headless content management system. It is designed for:

- **Location-based service pages** (e.g., "Web Development in London")
- **Blog posts** managed via Sanity
- **Lead generation** through enquiry forms with reCAPTCHA protection
- **SEO optimization** with dynamic sitemaps and metadata

**Website URL**: https://tapouts.co

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework for server-side rendering |
| **React** | 19.2.3 | UI library |
| **Sanity** | 5.1.0 | Headless CMS for content management |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **Framer Motion** | 12.23.26 | Animations |
| **TypeScript** | 5 | Type safety |
| **Nodemailer** | 7.0.12 | Email sending |
| **react-google-recaptcha** | 3.1.0 | Spam protection |

---

## Folder Structure

```
├── docs/                    # Documentation (you are here)
├── public/                  # Static assets (favicon, images)
├── scripts/                 # Utility scripts for data generation
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utilities and constants
│   └── sanity/              # Sanity configuration and schemas
├── .env.local               # Environment variables (DO NOT COMMIT)
├── next.config.ts           # Next.js configuration
├── sanity.config.ts         # Sanity Studio configuration
├── package.json             # Dependencies and scripts
└── redirects.ts             # URL redirects for old blog posts
```

---

## Root Configuration Files

### `package.json`
**What it does**: Defines project dependencies and npm scripts.

**Key scripts**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production server

**To add a new package**: Run `npm install package-name`

---

### `next.config.ts`
**What it does**: Next.js configuration for images and redirects.

```typescript
// Currently configured:
// 1. Image optimization for Sanity CDN and Unsplash
// 2. Permanent redirects for old blog URLs
```

**EDIT THIS FILE TO**:
- Add new image domains (if using images from new sources)
- Add new redirects

---

### `sanity.config.ts`
**What it does**: Configures the embedded Sanity Studio accessible at `/studio`.

**Important**: The Sanity Studio is accessed at `https://yourdomain.com/studio`

---

### `redirects.ts`
**What it does**: Maps old blog URLs to new format.

**Example**: `/omnichannel-marketing-strategy` → `/blog/omnichannel-marketing-strategy`

**EDIT THIS FILE TO**: Add redirects when migrating from old URL structures.

---

### `tsconfig.json`
**What it does**: TypeScript configuration.

**Important path alias**: `@/*` maps to `./src/*`
- Example: `import { client } from '@/sanity/lib/client'` refers to `src/sanity/lib/client.ts`

---

## App Directory (Pages & Routes)

The `src/app/` folder uses **Next.js App Router**. Each folder represents a URL path.

### Page Files Explained

| File | URL | Description |
|------|-----|-------------|
| `page.tsx` | `/` | Homepage |
| `about/page.tsx` | `/about` | About page |
| `contact/page.tsx` | `/contact` | Contact page |
| `blog/page.tsx` | `/blog` | Blog listing page |
| `blog/[slug]/page.tsx` | `/blog/your-post-slug` | Individual blog post |
| `services/[serviceType]/[location]/page.tsx` | `/services/web-development/london` | Location-specific service page |
| `service-areas/page.tsx` | `/service-areas` | Service areas listing |
| `membership/page.tsx` | `/membership` | Membership/pricing page |
| `studio/[[...index]]/page.tsx` | `/studio` | Sanity Studio (CMS admin) |

### Dynamic Routes (Important!)

**`[slug]`** = Dynamic segment that changes based on content
- `blog/[slug]` → The `[slug]` is replaced with the actual post slug from Sanity

**`[serviceType]/[location]`** = Nested dynamic routes
- URL: `/services/web-development/manchester`
- `serviceType` = "web-development"
- `location` = "manchester"

---

### `src/app/layout.tsx` (Root Layout)
**What it does**: Wraps ALL pages with common elements.

**Contains**:
1. **Font Loading** (Inter, Outfit, Anton)
2. **Navbar** - Site navigation
3. **Footer** - Site footer
4. **SidebarForm** - Floating enquiry form
5. **GoHighLevel Chat Widget** - Third-party chat

**EDIT THIS FILE TO**:
- Change fonts
- Modify global metadata (site title, description)
- Add/remove global widgets
- Change the chat widget ID

---

### `src/app/page.tsx` (Homepage)
**What it does**: The main landing page.

**Sections in order**:
1. AnimatedHero - Hero section with animation
2. Partners - Partner logos
3. Feature Sections - Multiple feature blocks
4. Recommended Section - Service cards
5. Testimonials - Customer reviews
6. CTA Section - Call to action

**EDIT THIS FILE TO**:
- Change homepage content
- Reorder sections
- Add/remove feature sections

---

### `src/app/blog/page.tsx` (Blog Listing)
**What it does**: Displays all blog posts from Sanity.

**Revalidation**: Every 60 seconds (ISR - Incremental Static Regeneration)

**EDIT THIS FILE TO**: Change blog listing layout or add filtering.

---

### `src/app/blog/[slug]/page.tsx` (Individual Blog Post)
**What it does**: Displays a single blog post.

**Features**:
- Dynamic SEO metadata from Sanity
- Author info
- Category tags
- Rich text content

**Revalidation**: Every 24 hours

---

### `src/app/services/[serviceType]/[location]/page.tsx` (Service + Location Page)
**What it does**: THE CORE OF THE LOCATION-BASED SEO STRATEGY.

This page displays content for combinations like:
- `/services/web-development/london`
- `/services/seo-marketing/manchester`

**How it works**:
1. URL slug is converted to Sanity service name using `SERVICE_TYPE_MAP`
2. Fetches page content from Sanity matching `serviceType` + `location`
3. Displays the content with an enquiry form sidebar

**Important**: Service types must match between `constants.ts` and Sanity schema.

**EDIT THIS FILE TO**: Change the layout of service pages.

---

### `src/app/api/send-email/route.ts` (Email API)
**What it does**: Backend API for sending enquiry emails.

**Flow**:
1. Receives form data + reCAPTCHA token
2. Verifies reCAPTCHA with Google
3. Sends email via Nodemailer (SMTP)

**Environment Variables Required**:
- `RECAPTCHA_SECRET_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

**EDIT THIS FILE TO**:
- Change email recipient
- Modify email template
- Add additional form fields

---

### `src/app/sitemap.ts` (Dynamic Sitemap)
**What it does**: Generates `/sitemap.xml` for SEO.

**Includes**:
1. Static pages (/about, /contact, etc.)
2. All blog posts from Sanity
3. All service pages from Sanity

**EDIT THIS FILE TO**: Add new static routes or change sitemap priorities.

---

### `src/app/robots.ts` (Robots.txt)
**What it does**: Generates `/robots.txt` for search engines.

**Current rules**:
- Allow all pages
- Block `/studio/` (Sanity admin)

---

## Components

### `src/components/EnquiryForm.tsx`
**What it does**: Lead capture form with reCAPTCHA.

**Fields**:
- Name, Email, Phone
- Topic (dropdown)
- Message
- GDPR consent checkbox
- Newsletter opt-in

**EDIT THIS FILE TO**:
- Add/remove form fields
- Change topic dropdown options
- Modify form styling

---

### `src/components/AnimatedHero.tsx`
**What it does**: Homepage hero section with animations.

**Features**:
- Scroll-based parallax effect (Framer Motion)
- Floating UI elements
- CTA buttons

---

### `src/components/BrandName.tsx`
**What it does**: Displays "Tapouts" brand name with consistent styling.

**IMPORTANT FOR CLONING**: Update this component to change the brand name throughout the site.

---

### `src/components/Navbar.tsx`
**What it does**: Site navigation header.

**EDIT THIS FILE TO**: Change navigation links or logo.

---

### `src/components/Footer.tsx`
**What it does**: Site footer with links and contact info.

**EDIT THIS FILE TO**: Update footer links, address, or social media.

---

### `src/components/SidebarForm.tsx`
**What it does**: Floating sidebar enquiry form that appears on scroll.

---

### `src/components/Blog/RichTextComponents.tsx`
**What it does**: Renders Sanity Portable Text (rich text) content.

**EDIT THIS FILE TO**: Change how blog content elements are styled.

---

### `src/components/Blog/BlogCard.tsx`
**What it does**: Card component for blog post listings.

---

## Sanity CMS Integration

### Overview
Sanity is the headless CMS where content is managed. The admin panel is at `/studio`.

### Schema Files (`src/sanity/schemaTypes/`)

| File | Sanity Type | Description |
|------|-------------|-------------|
| `post.ts` | post | Blog posts |
| `author.ts` | author | Blog authors |
| `category.ts` | category | Blog categories |
| `location.ts` | location | UK cities/towns for service pages |
| `servicePage.ts` | servicePage | Service + Location page content |
| `blockContent.ts` | blockContent | Rich text editor configuration |

---

### `src/sanity/schemaTypes/location.ts`
**What it does**: Defines UK locations for service pages.

**Fields**:
- `name` - Location name (e.g., "London")
- `slug` - URL-friendly version (e.g., "london")
- `type` - City, Town, County, District, Village, Borough
- `parent` - Parent location (for hierarchy)
- `description` - Location description

---

### `src/sanity/schemaTypes/servicePage.ts`
**What it does**: Defines service pages for each location.

**Fields**:
- `title` - Page title
- `slug` - URL slug
- `serviceType` - Gen AI, Web Development (dropdown)
- `location` - Reference to location
- `seoTitle` - SEO title
- `seoDescription` - SEO meta description
- `body` - Rich text content

**IMPORTANT**: Current service types are limited to "Gen AI" and "Web Development" in the dropdown. To add more, edit the `list` array in this file.

---

### `src/sanity/schemaTypes/post.ts`
**What it does**: Blog post schema.

**Fields**:
- `title`, `slug`, `author`, `mainImage`
- `cloudinaryImage` - For external images
- `categories`, `publishedAt`
- `body` - Rich text content
- `seoTitle`, `seoDescription`, `seoKeywords`

---

### `src/sanity/env.ts`
**What it does**: Exports Sanity environment variables.

**Required env vars**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

---

### `src/sanity/lib/client.ts`
**What it does**: Creates Sanity client for data fetching.

---

### `src/sanity/lib/image.ts`
**What it does**: Helper for generating Sanity image URLs.

---

## Utility Files

### `src/lib/constants.ts`
**What it does**: Defines service types and their URL slugs.

**CRITICAL FILE FOR SERVICE PAGES**

```typescript
export const SERVICES: ServiceDef[] = [
    { name: 'Web Development', title: 'Web Development', slug: 'web-development', primary: true },
    { name: 'Gen AI', title: 'Gen AI Services', slug: 'gen-ai-services' },
    // ... more services
];
```

**EDIT THIS FILE TO**:
- Add new service types
- Change service display names
- Modify URL slugs

**IMPORTANT**: Service names here MUST match the dropdown values in `servicePage.ts` Sanity schema.

---

### `src/types.ts`
**What it does**: TypeScript type definitions.

**Key types**:
- `Post` - Blog post structure
- `Author` - Author structure
- `Category` - Category structure

---

## Scripts

### `scripts/generate-service-pages.js`
**What it does**: BULK GENERATES service pages in Sanity from a CSV file.

**How it works**:
1. Reads `service-areas-template.csv`
2. Creates/updates location documents in Sanity
3. Links parent-child locations
4. Generates service pages for each location × service combination

**To run**: `node scripts/generate-service-pages.js`

**Required**: `SANITY_API_TOKEN` in `.env.local` (with write permissions)

**CSV Format**:
```csv
Location Name,Location Type,Parent Location,Description (Optional)
London,City,,The capital of England
Westminster,Borough,London,A borough in London
```

---

## Environment Variables

Create a `.env.local` file with:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token  # For scripts only

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# SMTP (Email)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=465
SMTP_USER=your_email@domain.com
SMTP_PASS=your_password
```

---

## Common Editing Tasks

### Change the Brand Name
1. Edit `src/components/BrandName.tsx`
2. Update metadata in `src/app/layout.tsx`
3. Update `sitemap.ts` BASE_URL
4. Update `robots.ts` sitemap URL

### Add a New Service Type
1. Add to `src/lib/constants.ts` SERVICES array
2. Add to `src/sanity/schemaTypes/servicePage.ts` dropdown list
3. Run `npm run dev` to see changes in Sanity Studio

### Add a New Static Page
1. Create folder in `src/app/` (e.g., `src/app/pricing/`)
2. Create `page.tsx` inside
3. Add to sitemap in `src/app/sitemap.ts`
4. Add navigation link in `Navbar.tsx`

### Modify Email Template
1. Edit `src/app/api/send-email/route.ts`
2. Modify the `html` template in `mailOptions`

### Add New Form Fields
1. Add field to form state in `EnquiryForm.tsx`
2. Add input element
3. Update API route to include field in email

---

## Doubts / Areas Needing Clarification

1. **GoHighLevel Widget ID**: The chat widget in `layout.tsx` uses a specific ID (`692b98d48fcc751d52c8c8de`). This will need to be replaced for a new site.

2. **Cloudinary Integration**: Posts support `cloudinaryImage` field but integration details are unclear.

3. **Generate Service Pages Script**: The CSV file `service-areas-template.csv` format needs verification with actual data.

4. **Contact Form Email**: Currently sends to `connect@komaknexus.com` - this is hardcoded and needs updating.

---

*Document created: December 27, 2024*
*For: Tapouts.co website codebase*
