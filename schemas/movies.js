const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().positive().default(1),
  poster: z.string().url({
    message: 'URL must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Drama', 'Horror', 'Crime', 'Sci-Fi', 'Romance', 'Biography', 'Fantasy']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of strings'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
