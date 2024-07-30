import { defineConfig } from 'tsup'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/cli.ts'],
  format: 'esm',
  splitting: false,
  clean: true,
  dts: true,
  define: {
    PKG_VERSION: JSON.stringify(pkg.version),
    PKG_NAME: JSON.stringify(pkg.name),
  }
})
