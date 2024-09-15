import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().min(1),
  AUTH_REDIRECT_URL: z.string().min(1),
  JWT_SECRET_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
