import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'dist/index.js',
    sourcemap: true,
    platform: 'browser',
    format: 'esm',
  })
  .catch(() => process.exit(1));
