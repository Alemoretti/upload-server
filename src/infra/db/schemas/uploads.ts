import { randomUUID } from 'node:crypto'
import { create } from 'node:domain'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, text } from 'drizzle-orm/pg-core'

export const uploads = pgTable('uploads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text('name').notNull(),
  remoteKey: text('remote_key').notNull().unique(),
  remoteUrl: text('remote_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
