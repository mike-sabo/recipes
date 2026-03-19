export const getAllRecipesQuery = `*[_type == "recipe"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  prepTime,
  cookTime,
  tags
}`

export const getRecipeBySlugQuery = `*[_type == "recipe" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image,
  prepTime,
  cookTime,
  tags,
  ingredients[] {
    name,
    quantity,
    unit
  },
  steps
}`

export const getAllRecipeSlugsQuery = `*[_type == "recipe" && defined(slug.current)] {
  "slug": slug.current
}`
