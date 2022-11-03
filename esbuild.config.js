const esbuild = require('esbuild')

esbuild.buildSync({
  platform: 'node',
  entryPoints: ['src/shared/http/server.ts'],
  minify: true,
  bundle: true,
  keepNames: true,
  outdir: './dist',
  sourcemap: true,
  external: ['node_modules'],
})
