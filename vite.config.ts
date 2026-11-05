import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'node:url';
import {copyFileSync, existsSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

// Deployment base path.
// - "/" for Firebase Hosting, a custom domain, or a <user>.github.io repository.
// - "/<repository>/" for a GitHub Pages project site (set automatically by
//   .github/workflows/deploy-pages.yml).
function basePath(): string {
  const raw = (process.env.BASE_PATH || '/').trim();
  const withLead = raw.startsWith('/') ? raw : '/' + raw;
  return withLead.endsWith('/') ? withLead : withLead + '/';
}

// GitHub Pages serves static files only and has no rewrite rules. Copying
// index.html to 404.html makes deep links such as /poll/<id> and
// /auth/action load the app, which then routes on the path. .nojekyll stops
// GitHub from running Jekyll over the build output.
function staticHostFallback(): Plugin {
  let outDir = 'dist';
  return {
    name: 'static-host-fallback',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir; },
    closeBundle() {
      const index = join(outDir, 'index.html');
      if (existsSync(index)) copyFileSync(index, join(outDir, '404.html'));
      writeFileSync(join(outDir, '.nojekyll'), '');
    },
  };
}

export default defineConfig({
  base: basePath(),
  plugins: [react(), staticHostFallback()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        hub: fileURLToPath(new URL('./index.html', import.meta.url)),
        logo: fileURLToPath(new URL('./logo-desk/index.html', import.meta.url)),
        report: fileURLToPath(new URL('./logo-desk/report.html', import.meta.url)),
      },
    },
  },
  resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}},
});
