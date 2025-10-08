import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeUpload(
  overrides?: Partial<InferInsertModel<typeof schema.uploads>>
) {
  const fileName = faker.system.fileName()
  const uniqueId = randomUUID()

  const result = await db
    .insert(schema.uploads)
    .values({
      name: fileName,
      remoteKey: `images/${uniqueId}-${fileName}`,
      remoteUrl: `https://example.com/images/${uniqueId}-${fileName}`,
      ...overrides,
    })
    .returning()

  return result[0]
}
