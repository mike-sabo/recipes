import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '../../sanity/client'
import { getRecipeBySlugQuery } from '../../sanity/queries'
import { urlFor } from '../../sanity/image'

export const dynamic = 'force-dynamic'

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = await client.fetch(getRecipeBySlugQuery, { slug })

  if (!recipe) notFound()

  const { title, description, image, prepTime, cookTime, tags, ingredients, steps } = recipe

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All Recipes
        </Link>
      </div>

      {/* Hero image */}
      {image?.asset && (
        <div className="relative w-full h-[40vh] sm:h-[50vh] mt-6 bg-zinc-100">
          <Image
            src={urlFor(image).width(1200).height(600).fit('crop').url()}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-4">{title}</h1>

            {description && (
              <p className="text-lg text-zinc-500 leading-relaxed mb-8">{description}</p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Steps */}
            {steps && steps.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">Instructions</h2>
                <div className="prose prose-zinc prose-p:leading-relaxed prose-p:text-zinc-600 max-w-none">
                  <PortableText value={steps} />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="mt-10 lg:mt-0">
            {/* Time card */}
            {(prepTime || cookTime) && (
              <div className="rounded-2xl bg-white border border-zinc-100 shadow-sm p-5 mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Time</h3>
                <dl className="space-y-3">
                  {prepTime && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-zinc-500">Prep</dt>
                      <dd className="text-sm font-medium text-zinc-900">{prepTime} min</dd>
                    </div>
                  )}
                  {cookTime && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-zinc-500">Cook</dt>
                      <dd className="text-sm font-medium text-zinc-900">{cookTime} min</dd>
                    </div>
                  )}
                  {prepTime && cookTime && (
                    <>
                      <div className="border-t border-zinc-100 pt-3 flex justify-between">
                        <dt className="text-sm font-medium text-zinc-700">Total</dt>
                        <dd className="text-sm font-semibold text-zinc-900">{prepTime + cookTime} min</dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Ingredients card */}
            {ingredients && ingredients.length > 0 && (
              <div className="rounded-2xl bg-white border border-zinc-100 shadow-sm p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {ingredients.map((item: { name: string; quantity?: number; unit?: string }, idx: number) => (
                    <li key={idx} className="flex items-baseline gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span className="text-zinc-900 font-medium">{item.name}</span>
                      {(item.quantity || item.unit) && (
                        <span className="ml-auto text-zinc-400 shrink-0">
                          {item.quantity} {item.unit}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
