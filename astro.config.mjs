import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://alessandrodifa.com',

  vite: {
    server: {
      allowedHosts: true
    }
  },

  integrations: [react()]
});