import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/infra/db/schemas/*',
  out: 'src/infra/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
