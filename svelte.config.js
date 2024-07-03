import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),

  kit: {
    // This might be different depending on your specific adapter
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),

    // other configurations...
  }
};
