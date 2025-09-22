import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({
            uploadId: z.string(),
          }),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Upload already exists'),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fileSize: 1024 * 1024 * 2, // 2mb
        },
      })

      await db.insert(schema.uploads).values({
        name: 'test.jpg',
        remoteKey: 'test.jpg',
        remoteUrl: 'http://test.com',
      })
      return reply.status(201).send({ uploadId: 'test' })
    }
  )
}
