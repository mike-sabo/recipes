
import { client } from './sanity/client'
import { getAllRecipesQuery } from './sanity/queries'
import RecipeCard from '@/components/RecipeCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const recipes = await client.fetch(getAllRecipesQuery)

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Recipes</h1>
          <p className="mt-2 text-zinc-500 text-lg">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} to explore
          </p>
        </header>

        {recipes.length === 0 ? (
          <div className="text-center py-24 text-zinc-400">
            <p className="text-xl">No recipes yet. Add some in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe: Parameters<typeof RecipeCard>[0]['recipe']) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
