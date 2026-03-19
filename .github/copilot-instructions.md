# Copilot Instructions — Recipes App

## Project Overview

A **headless recipe app** built with Next.js 16 (App Router) and Sanity.io as the CMS. The frontend is a read-only public site hosted on Vercel at `recipes.mikesabo.dev`. Content is managed in a separate Sanity Studio repo (`mike-sabo/sanity`).

## Architecture

```
Sanity Studio (mike-sabo/sanity)
       │  GROQ queries over HTTPS
       ▼
Next.js App Router (this repo)
  ├── app/page.tsx              — Recipe list (async Server Component)
  ├── app/recipes/[slug]/page.tsx — Recipe detail (async Server Component)
  ├── app/components/RecipeCard.tsx — Card UI (Server Component)
  └── app/sanity/
        ├── client.ts           — Sanity client (createClient)
        ├── queries.ts          — GROQ query strings
        ├── image.ts            — @sanity/image-url builder
        └── env.ts              — env var exports
```

## Sanity Content Model

### `recipe` (document)
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Source: `title` |
| `image` | image | Hotspot enabled |
| `description` | text | Short summary |
| `ingredients` | array of `ingredient` | See below |
| `steps` | array of block | PortableText (rich text) |
| `prepTime` | number | Minutes |
| `cookTime` | number | Minutes |
| `tags` | array of string | Tag layout |

### `ingredient` (object, embedded in recipe)
| Field | Type | Notes |
|---|---|---|
| `name` | string | Required |
| `quantity` | number | Optional |
| `unit` | string | Optional (e.g. "cups", "tbsp") |

## Data Fetching Conventions

- All data fetching is done **server-side** in async Server Components — no `useEffect`, no `useState` for data.
- Fetch data directly with `client.fetch(query, params)` from `app/sanity/client.ts`.
- GROQ queries live in `app/sanity/queries.ts` — add new queries there.
- `revalidate = 60` (ISR) is set on all pages — content updates go live within 60 seconds.
- Images use `@sanity/image-url` via `urlFor()` from `app/sanity/image.ts`.
- Render Sanity rich text (PortableText) with `<PortableText value={steps} />` from `@portabletext/react`.

## GROQ Patterns

```ts
// All recipes (list)
*[_type == "recipe"] | order(_createdAt desc) { _id, title, slug, description, image, prepTime, cookTime, tags }

// Single recipe by slug
*[_type == "recipe" && slug.current == $slug][0] { ..., ingredients[], steps }

// All slugs for generateStaticParams
*[_type == "recipe" && defined(slug.current)] { "slug": slug.current }
```

## Routing

- `/` — recipe grid (App Router `app/page.tsx`)
- `/recipes/[slug]` — recipe detail (App Router `app/recipes/[slug]/page.tsx`)
- All routes are Server Components. Do **not** add `"use client"` unless building an interactive UI element.
- Navigation uses `next/link` (`<Link href="...">`) — never plain `<a>` for internal routes.
- Images use `next/image` (`<Image ...>`) — never plain `<img>`.

## Styling

- **Tailwind CSS v4** — utility classes only, no custom config.
- Color palette: `zinc-*` for neutrals, `amber-*` for accents/highlights.
- Design is minimal and modern: generous whitespace, rounded-2xl cards, subtle shadows.
- Dark mode is **not** implemented — keep the light-only design clean.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID (`t27ykr9u`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Defaults to `2026-03-17` |

## Adding New Features

- **New page**: create `app/<route>/page.tsx` as an `async` Server Component, add GROQ query to `queries.ts`.
- **New component**: default to Server Component; only add `"use client"` for interactivity (forms, modals, etc.).
- **New content type**: add schema to `mike-sabo/sanity` repo first, then add GROQ query and render it here.
- **New images**: always use `urlFor(image).width(W).height(H).fit('crop').url()` and pass to `<Image>`.
