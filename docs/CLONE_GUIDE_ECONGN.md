# Website Cloning Guide: econgn.com

> **Purpose**: Step-by-step guide to clone the Tapouts website for a new website focused on **UK Government Grant Services** (Insulation Solutions, Heating Systems, Renewable Energy).

---

## New Website Overview

| Attribute | Value |
|-----------|-------|
| **Domain** | econgn.com |
| **Niche** | UK Government Grants (Energy Efficiency) |
| **Services** | Insulation Solutions, Heating Systems, Renewable Energy |
| **Target** | UK Cities and Towns |
| **Tech Stack** | Next.js + Sanity (same as current) |

---

## Pre-Cloning Checklist (REQUIRED FROM DEVELOPER)

Before starting, gather all the following information:

### 1. Brand & Business Information

| Item | Your Answer |
|------|-------------|
| Company Name | |
| Tagline/Slogan | |
| Company Description (2-3 sentences) | |
| Logo File (SVG preferred) | |
| Primary Brand Color (hex code) | |
| Secondary Brand Color (hex code) | |
| Accent Color (hex code) | |

### 2. Contact Information

| Item | Your Answer |
|------|-------------|
| Business Email | |
| Phone Number | |
| Physical Address | |
| VAT Number (if applicable) | |

### 3. Social Media URLs

| Platform | URL |
|----------|-----|
| Facebook | |
| Twitter/X | |
| LinkedIn | |
| Instagram | |
| YouTube | |

### 4. Services Definition

Define your service types (these will become URL paths like `/services/insulation-solutions/london`):

| Service Name | Display Title | URL Slug |
|--------------|---------------|----------|
| Insulation | Insulation Solutions | insulation-solutions |
| Heating | Heating Systems | heating-systems |
| Renewable | Renewable Energy | renewable-energy |
| (Add more as needed) | | |

### 5. Third-Party Services (REQUIRED)

#### Sanity CMS
- [ ] Create a new Sanity project at https://sanity.io
- **Project ID**: ________________
- **Dataset Name**: production (recommended)
- **API Token** (with write access): ________________

#### Google reCAPTCHA v2
- [ ] Create at https://www.google.com/recaptcha/admin
- **Site Key**: ________________
- **Secret Key**: ________________

#### SMTP Email Service
- [ ] Choose a provider (Mailgun, SendGrid, Gmail SMTP, etc.)
- **SMTP Host**: ________________
- **SMTP Port**: ________________
- **Username**: ________________
- **Password**: ________________

#### Analytics (Optional)
- **Google Analytics ID**: ________________
- **GoHighLevel Widget ID**: ________________ (if using chat)

### 6. Content Requirements

| Item | Description |
|------|-------------|
| About Page Content | Company history, mission, values |
| Homepage Headline | Main hero text |
| Homepage Subheadline | Supporting text |
| Testimonials | At least 3-5 customer reviews |
| Partner Logos | Images of partner companies |
| FAQ Content | At least 5-10 common questions |

### 7. Location List (CSV Required)

Create a CSV file with your target UK locations:

```csv
Location Name,Location Type,Parent Location,Description (Optional)
London,City,,The capital of England
Birmingham,City,,Major city in the West Midlands
Manchester,City,,Major city in the North West
Westminster,Borough,London,Central borough of London
```

---

## Step-by-Step Cloning Instructions

### Phase 1: Repository Setup

#### Step 1.1: Clone the Repository
```powershell
# Clone the original repo
git clone https://github.com/YOUR_ORG/tapouts-website.git econgn-website

# Navigate to new folder
cd econgn-website

# Remove old git history
Remove-Item -Recurse -Force .git

# Initialize new repo
git init
git add .
git commit -m "Initial commit: Clone from Tapouts template"
```

#### Step 1.2: Install Dependencies
```powershell
npm install
```

#### Step 1.3: Create Environment File
Create `.env.local` with:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_new_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# SMTP
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=465
SMTP_USER=connect@econgn.com
SMTP_PASS=your_password
```

---

### Phase 2: Branding Updates

#### Step 2.1: Update Brand Name Component
**File**: `src/components/BrandName.tsx`

```tsx
// BEFORE (Tapouts)
export default function BrandName({ className = '' }) {
  return <span className={`font-anton ${className}`}>Tapouts</span>;
}

// AFTER (econgn)
export default function BrandName({ className = '' }) {
  return <span className={`font-anton ${className}`}>econgn</span>;
}
```

#### Step 2.2: Update Root Layout Metadata
**File**: `src/app/layout.tsx`

```tsx
// BEFORE
export const metadata: Metadata = {
  metadataBase: new URL('https://tapouts.co'),
  title: "Tapouts | Smart Maintenance",
  description: "Smart Maintenance. Unified Approach. Exponential Results.",
};

// AFTER
export const metadata: Metadata = {
  metadataBase: new URL('https://econgn.com'),
  title: "econgn | UK Government Grant Services",
  description: "Insulation Solutions, Heating Systems, and Renewable Energy - Helping UK homes save with government grants.",
};
```

#### Step 2.3: Update Fonts (if changing brand style)
In the same `layout.tsx`, modify font imports if needed.

#### Step 2.4: Remove/Replace GoHighLevel Widget
**File**: `src/app/layout.tsx`

Remove or replace:
```tsx
<Script
  src="https://widgets.leadconnectorhq.com/loader.js"
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
  data-widget-id="692b98d48fcc751d52c8c8de"  // CHANGE THIS
  strategy="lazyOnload"
/>
```

---

### Phase 3: Update Service Types

#### Step 3.1: Update Constants
**File**: `src/lib/constants.ts`

```typescript
// BEFORE (Tapouts services)
export const SERVICES: ServiceDef[] = [
    { name: 'Web Development', title: 'Web Development', slug: 'web-development', primary: true },
    { name: 'Gen AI', title: 'Gen AI Services', slug: 'gen-ai-services' },
    // ...
];

// AFTER (econgn services)
export const SERVICES: ServiceDef[] = [
    { name: 'Insulation', title: 'Insulation Solutions', slug: 'insulation-solutions', primary: true },
    { name: 'Heating', title: 'Heating Systems', slug: 'heating-systems' },
    { name: 'Renewable', title: 'Renewable Energy', slug: 'renewable-energy' },
    { name: 'Solar Panels', title: 'Solar Panel Installation', slug: 'solar-panels' },
    { name: 'Air Source Heat Pumps', title: 'Air Source Heat Pumps', slug: 'air-source-heat-pumps' },
    { name: 'Boiler Upgrade', title: 'Boiler Upgrade Scheme', slug: 'boiler-upgrade-scheme' },
];
```

#### Step 3.2: Update Sanity Schema Service Types
**File**: `src/sanity/schemaTypes/servicePage.ts`

```typescript
defineField({
    name: 'serviceType',
    title: 'Service Type',
    type: 'string',
    options: {
        list: [
            // CHANGE THESE TO MATCH YOUR SERVICES
            { title: 'Insulation', value: 'Insulation' },
            { title: 'Heating', value: 'Heating' },
            { title: 'Renewable', value: 'Renewable' },
            { title: 'Solar Panels', value: 'Solar Panels' },
            { title: 'Air Source Heat Pumps', value: 'Air Source Heat Pumps' },
            { title: 'Boiler Upgrade', value: 'Boiler Upgrade' },
        ],
    },
}),
```

**CRITICAL**: The `value` in the schema MUST match the `name` in constants.ts!

---

### Phase 4: Update Form Topics

#### Step 4.1: EnquiryForm Topics
**File**: `src/components/EnquiryForm.tsx`

Find the topic dropdown and update:
```tsx
<select name="topic" ...>
    <option>Insulation Solutions</option>
    <option>Heating Systems</option>
    <option>Renewable Energy</option>
    <option>Solar Panels</option>
    <option>Government Grants</option>
    <option>General Enquiry</option>
</select>
```

---

### Phase 5: Update Content

#### Step 5.1: Homepage Content
**File**: `src/app/page.tsx`

This file contains the main homepage content. You'll need to update:

1. **Feature Sections** - Change titles, descriptions, and features
2. **Recommended Section** - Change the service cards
3. **CTA Section** - Update text and buttons

Example for Feature Section:
```tsx
<FeatureSection
    title="INSULATION"
    description="Reduce energy bills and carbon footprint with government-funded insulation."
    features={[
        "Free Eligibility Check",
        "100% Government Funded",
        "Professional Installation"
    ]}
    imageSrc="https://images.unsplash.com/photo-insulation-image"
    imageAlt="Home Insulation"
    badge="Save Energy"
/>
```

#### Step 5.2: AnimatedHero Content
**File**: `src/components/AnimatedHero.tsx`

Update hero text:
```tsx
<h1 className="...">
    Stop wasting energy, <br />
    <span className="...">
        Start Saving
    </span>
</h1>
<h2 className="...">
    Free Government Grants for UK Homes
</h2>
```

---

### Phase 6: Update SEO Files

#### Step 6.1: Sitemap
**File**: `src/app/sitemap.ts`

```typescript
const BASE_URL = 'https://econgn.com'; // CHANGE THIS
```

#### Step 6.2: Robots.txt
**File**: `src/app/robots.ts`

```typescript
sitemap: 'https://econgn.com/sitemap.xml', // CHANGE THIS
```

---

### Phase 7: Update Email API

**File**: `src/app/api/send-email/route.ts`

```typescript
const mailOptions = {
    from: '"econgn Website" <connect@econgn.com>', // CHANGE THIS
    to: process.env.SMTP_USER || "connect@econgn.com", // CHANGE THIS
    subject: `New Enquiry: ${topic} from ${name}`,
    // ...
};
```

---

### Phase 8: Update Footer & Navbar

#### Step 8.1: Footer
**File**: `src/components/Footer.tsx`

Update:
- Company name
- Address
- Phone/Email
- Social media links
- Navigation links

#### Step 8.2: Navbar
**File**: `src/components/Navbar.tsx`

Update:
- Logo/brand name
- Navigation menu items

---

### Phase 9: Sanity CMS Setup

#### Step 9.1: Deploy Sanity Studio
```powershell
npm run dev
```
Then visit `http://localhost:3000/studio` to access Sanity.

#### Step 9.2: Create Initial Content in Sanity

1. **Create Authors** for blog posts
2. **Create Categories** for blog organization
3. **Create Locations** (UK cities/towns)
4. **Create Service Pages** (or use bulk generation script)

---

### Phase 10: Bulk Generate Service Pages

#### Step 10.1: Prepare CSV File
Create `service-areas-template.csv` with UK locations:

```csv
Location Name,Location Type,Parent Location,Description (Optional)
London,City,,The capital of England
Birmingham,City,,The second largest city in England
Manchester,City,,Major city in the North West
Leeds,City,,Major city in Yorkshire
Liverpool,City,,City in Merseyside
Bristol,City,,City in the South West
Sheffield,City,,City in South Yorkshire
Newcastle,City,,City in the North East
Nottingham,City,,City in the East Midlands
```

#### Step 10.2: Update Generation Script
**File**: `scripts/generate-service-pages.js`

Update services array:
```javascript
const services = [
    "Insulation",
    "Heating",
    "Renewable",
    "Solar Panels",
    "Air Source Heat Pumps",
    "Boiler Upgrade"
];
```

Update content template `generateBody` function with energy/grant-related content.

#### Step 10.3: Run Generation Script
```powershell
node scripts/generate-service-pages.js
```

---

### Phase 11: Clear Old Redirects

**File**: `redirects.ts`

Clear the old Tapouts blog redirects:
```typescript
export const redirects = [
    // Add any redirects needed for econgn.com
    // Or leave empty if starting fresh
].map(slug => ({
    source: `/${slug}`,
    destination: `/blog/${slug}`,
    permanent: true,
}));
```

---

### Phase 12: Final Testing Checklist

- [ ] Run `npm run dev` and verify site works
- [ ] Check all pages load correctly
- [ ] Test contact form submission
- [ ] Verify reCAPTCHA works
- [ ] Access Sanity Studio at `/studio`
- [ ] Create test blog post in Sanity
- [ ] Create test service page in Sanity
- [ ] Build production: `npm run build`
- [ ] Verify sitemap.xml generates correctly
- [ ] Verify robots.txt is correct

---

### Phase 13: Deployment

#### Option A: Netlify
1. Connect GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy

#### Option B: Vercel
1. Import project to Vercel
2. Set environment variables
3. Deploy

---

## Summary: All Files That Need Changes

| File | What to Change |
|------|----------------|
| `.env.local` | All environment variables |
| `src/components/BrandName.tsx` | Brand name |
| `src/app/layout.tsx` | Metadata, fonts, widget |
| `src/lib/constants.ts` | Service types |
| `src/sanity/schemaTypes/servicePage.ts` | Service type dropdown |
| `src/components/EnquiryForm.tsx` | Form topics |
| `src/app/page.tsx` | Homepage content |
| `src/components/AnimatedHero.tsx` | Hero content |
| `src/app/sitemap.ts` | BASE_URL |
| `src/app/robots.ts` | Sitemap URL |
| `src/app/api/send-email/route.ts` | Email addresses |
| `src/components/Footer.tsx` | Footer content |
| `src/components/Navbar.tsx` | Navigation links |
| `scripts/generate-service-pages.js` | Services array |
| `redirects.ts` | Clear old redirects |

---

## Prompts for AI Assistance

If you need help with specific tasks, here are prompts you can use:

### For Homepage Content:
```
I am building a website for econgn.com, a UK-based company offering government grant services for Insulation Solutions, Heating Systems, and Renewable Energy. Write compelling homepage sections including:
1. Hero section headline and subheadline
2. 3 feature section blocks highlighting key benefits
3. A recommended services section with 6-8 service cards
4. Customer testimonials (create 4 fictional but realistic testimonials)
5. FAQ section with 6 questions about UK government grants
```

### For Service Page Content:
```
Write SEO-optimized content for a service page about [Insulation Solutions] in [London]. Include:
1. H2: Main heading about the service in that location
2. Introduction paragraph
3. H3: Why choose us section with bullet points
4. H3: Transform your home section
Include keywords naturally: government grants, ECO4, free insulation, energy efficiency, UK homes
```

### For Blog Content:
```
Write a blog post about "Understanding the UK Government's ECO4 Scheme" for a website offering energy efficiency services. Include:
1. What is ECO4
2. Who is eligible
3. What improvements are covered
4. How to apply
Length: 800-1000 words
```

---

*Document created: December 27, 2024*
*Template based on: Tapouts.co website*
*Target site: econgn.com*
