import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	prefetch: {
		prefetchAll: true,
	},
	site: 'https://www.ajara.dev',
	integrations: [mdx(), sitemap(), icon(), tailwind({ applyBaseStyles: false })],
	markdown: {
		shikiConfig: {
			theme: 'monokai',
		},
		rehypePlugins: [rehypeExternalLinks],
	},
});
