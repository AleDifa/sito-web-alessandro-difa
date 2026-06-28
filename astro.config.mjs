import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alessandrodifa.com',
  vite: {
    server: {
      allowedHosts: true
    }
  }
});
