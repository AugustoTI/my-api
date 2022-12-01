const esbuild = require('esbuild')
const { globPlugin } = require('esbuild-plugin-glob')
const { esbuildDecorators } = require('@anatine/esbuild-decorators')

esbuild.build({
  platform: 'node',
  format: 'cjs',
  target: ['node18'],
  minify: true,
  sourcemap: true,
  outdir: './dist',
  keepNames: true,
  entryPoints: ['./src/**'],
  loader: {
    '.json': 'copy'
  },
  plugins: [globPlugin(), esbuildDecorators({
    tsconfig: './tsconfig.json',
    cwd: process.cwd()
  })],
})
