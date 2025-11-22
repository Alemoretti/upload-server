import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/infra/http/server.ts'],
  format: 'esm',
  outDir: 'dist',
  outExtension: () => ({ js: '.mjs' }),
  clean: true,
  loader: {
    '.sql': 'text',
  },
})
