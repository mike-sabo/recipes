import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../sanity/image'

interface RecipeCardProps {
  recipe: {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    image?: { asset: { _ref: string } }
    prepTime?: number
    cookTime?: number
    tags?: string[]
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { title, slug, description, image, prepTime, cookTime } = recipe
  const totalTime = (prepTime ?? 0) + (cookTime ?? 0)

  return (
    <Link href={`/recipes/${slug.current}`} className="group block">
      <article className="h-full rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden">
          {image?.asset ? (
            <Image
              src={urlFor(image).width(600).height(450).fit('crop').url()}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="text-lg font-semibold text-zinc-900 leading-snug mb-1 group-hover:text-amber-600 transition-colors">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {totalTime > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{totalTime} min</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
