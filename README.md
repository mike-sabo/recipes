This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Recipes

A headless recipe app built with **Next.js 16** (App Router) and **Sanity.io** as the content backend. All pages are async React Server Components — data is fetched server-side at request time with 60-second ISR revalidation.

**Live site:** [recipes.mikesabo.dev](https://recipes.mikesabo.dev)  
**Sanity Studio:** [mike-sabo/sanity](https://github.com/mike-sabo/sanity)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity.io (headless, separate repo) |
| Styling | Tailwind CSS v4 |
| Images | `next/image` + `@sanity/image-url` |
| Rich Text | `@portabletext/react` |
| Deployment | Vercel |

## Architecture

```
Sanity Studio (mike-sabo/sanity)
       │  GROQ queries over HTTPS
       ▼
Next.js App Router (this repo)
  ├── app/page.tsx                  — Recipe list (async Server Component)
  ├── app/recipes/[slug]/page.tsx   — Recipe detail (async Server Component)
  ├── app/components/RecipeCard.tsx — Card UI
  └── app/sanity/
        ├── client.ts               — Sanity client
        ├── queries.ts              — GROQ query strings
        ├── image.ts                — Image URL builder
        └── env.ts                  — Env var exports
```

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/mike-sabo/recipes.git
cd recipes
npm install
```

### 2. Set environment variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=t27ykr9u
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version (defaults to `2026-03-17`) |

## Deployment

Deployed on Vercel with a custom domain (`recipes.mikesabo.dev`) pointing to Vercel via a CNAME DNS record. Set the env vars above in the Vercel project settings.

## Content

Recipes are managed in the [Sanity Studio repo](https://github.com/mike-sabo/sanity). Content schema includes `recipe` documents with title, slug, image, description, ingredients, steps (PortableText), prep/cook times, and tags.
