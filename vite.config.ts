import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitest/config'
import { version as pkgVersion } from './package.json'

process.env.VITE_APP_VERSION = pkgVersion
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/**/components'],
      extensions: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@types': resolve(__dirname, './types'),
      '@tests': resolve(__dirname, './tests'),
    },
  },
  server: {
    port: 4000,
  },
  build: {
    minify: true
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'tests/unit/setup-vitest.ts',
    coverage: {reporter: ['text', 'lcov']}, // lcov reporter is used by IDE coverage extensions
    include: [
      'tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
  },
})
