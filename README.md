This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables (Netlify)

When deploying to Netlify, you MUST add the following environment variables in the **Site Settings > Build & Deploy > Environment** section:

### Sanity
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: (Your Project ID)
- `NEXT_PUBLIC_SANITY_DATASET`: production
- `SANITY_API_TOKEN`: (Your write token - Keep Secret!)

### Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: pk_live_...
- `STRIPE_SECRET_KEY`: sk_live_... (Keep Secret!)

### GoHighLevel
- `GHL_CLIENT_ID`: (Your App Client ID)
- `GHL_CLIENT_SECRET`: (Your App Secret - Keep Secret!)

> **Note**: Never commit your `.env` or `.env.local` files to GitHub. They are ignored by default.
