# Sanity CMS Quick Reference Guide

> A non-technical guide to managing content in Sanity CMS for the Tapouts/econgn website.

---

## Accessing Sanity Studio

1. Go to your website URL + `/studio`
   - Example: `https://tapouts.co/studio` or `https://econgn.com/studio`
2. Log in with your Sanity account

---

## Content Types Overview

| Content Type | What is it? | Where does it appear? |
|--------------|-------------|----------------------|
| **Post** | Blog article | `/blog` page and `/blog/[slug]` |
| **Author** | Blog author profile | Shown on blog posts |
| **Category** | Blog category tag | Used to organize posts |
| **Location** | UK city/town | Used for service pages |
| **Service Page** | Service + Location page | `/services/[service]/[location]` |

---

## Creating a Blog Post

1. In Sanity Studio, click **Post** in the left sidebar
2. Click **+ Create new document**
3. Fill in the fields:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| **Title** | Your post headline | Yes |
| **Slug** | Click "Generate" to auto-create from title | Yes |
| **Author** | Select from dropdown | Yes |
| **Main Image** | Upload or drag an image | Recommended |
| **Categories** | Select relevant categories | Recommended |
| **Published At** | Date and time | Yes (for ordering) |
| **Body** | Your post content (rich text editor) | Yes |
| **SEO Title** | Title for Google search results | Recommended |
| **SEO Description** | Description for Google | Recommended |
| **SEO Keywords** | Keywords (comma separated) | Optional |

4. Click **Publish** (top right)

---

## Using the Rich Text Editor (Body Field)

The body field is a rich text editor. Here's what you can do:

| Button | What it does |
|--------|--------------|
| **B** | Bold text |
| **I** | Italic text |
| **H1, H2, H3** | Headings (H2 recommended for sections) |
| **•** | Bullet list |
| **Link icon** | Add a hyperlink |
| **Image icon** | Insert an image |
| **Quote** | Block quote |

**Tip**: Use H2 for main sections and H3 for subsections.

---

## Creating a Location

Locations are UK cities, towns, and boroughs used for service pages.

1. Click **Location** in sidebar
2. Click **+ Create new document**
3. Fill in:

| Field | What to enter | Example |
|-------|---------------|---------|
| **Name** | Full location name | "Manchester" |
| **Slug** | Click Generate | "manchester" |
| **Type** | Select from dropdown | "City" |
| **Parent Location** | If this is a smaller area, select its parent | London → Westminster |
| **Description** | Optional description | "Major city in the North West" |

4. Click **Publish**

---

## Creating a Service Page

Service pages combine a SERVICE TYPE with a LOCATION.

1. Click **Service Page** in sidebar
2. Click **+ Create new document**
3. Fill in:

| Field | What to enter | Example |
|-------|---------------|---------|
| **Title** | "[Service] Services in [Location]" | "Web Development in Manchester" |
| **Slug** | Click Generate | "web-development-services-manchester" |
| **Service Type** | Select from dropdown | "Web Development" |
| **Location** | Search and select | "Manchester" |
| **SEO Title** | Title for Google | "Web Development Manchester | Tapouts" |
| **SEO Description** | Google description | "Expert web development services in Manchester..." |
| **Body** | Page content | (Use rich text editor) |

4. Click **Publish**

---

## Creating an Author

Authors are shown on blog posts.

1. Click **Author** in sidebar
2. Click **+ Create new document**
3. Fill in:

| Field | What to enter |
|-------|---------------|
| **Name** | Full name |
| **Slug** | Click Generate |
| **Image** | Profile photo |
| **Bio** | Short biography |

4. Click **Publish**

---

## Creating a Category

Categories help organize blog posts.

1. Click **Category** in sidebar
2. Click **+ Create new document**
3. Fill in:

| Field | What to enter |
|-------|---------------|
| **Title** | Category name (e.g., "Marketing Tips") |
| **Description** | What this category is about |

4. Click **Publish**

---

## Editing Existing Content

1. Click the content type in sidebar
2. Find the document you want to edit
3. Make your changes
4. Click **Publish** to save

---

## Uploading Images

### Within a document:
1. Click the image field
2. Drag and drop an image, or click "Select..."
3. Choose from your computer or Sanity's asset library

### Best practices:
- Use **WebP** or **JPG** format
- Keep images under **2MB**
- Add **Alt Text** for accessibility and SEO

---

## Understanding the URL Structure

Your content appears on the website like this:

| Content | URL Pattern | Example |
|---------|-------------|---------|
| Blog Post | `/blog/[slug]` | `/blog/how-to-save-energy` |
| Service Page | `/services/[type]/[location]` | `/services/insulation-solutions/london` |

The **slug** you set in Sanity becomes part of the URL.

---

## Common Issues

### "My changes aren't showing on the website"

- Wait 1-2 minutes - the website caches for performance
- Blog pages refresh every 60 seconds
- Service pages refresh every 24 hours

### "The service type I need isn't in the dropdown"

Contact your developer to add new service types. They need to update:
1. The Sanity schema
2. The constants file in the code

### "I can't find my content"

Use the search bar at the top of Sanity Studio.

---

## GROQ Query Reference (For Developers)

Quick reference for common Sanity queries:

```groq
// Get all posts
*[_type == "post"] | order(publishedAt desc)

// Get single post by slug
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->
}

// Get all locations
*[_type == "location"]

// Get service page by type and location
*[_type == "servicePage" && serviceType == $serviceType && location->slug.current == $locationSlug][0] {
  ...,
  location->
}
```

---

*Last updated: December 27, 2024*
