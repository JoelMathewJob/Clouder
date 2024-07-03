import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: '/Clouder/', // Set this to the name of your GitHub repository
  build: {
    outDir: 'build'
  }
});
