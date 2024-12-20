import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2020',
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
})
