import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://beta.duncanpetrie.com',
	integrations: [
		mdx({
			// remarkPlugins: [mdxComponentMapIntegration],
		}),
		sitemap(),
		// photoImport()
	],
	prefetch: true,
	redirects: {
		'/a/myth': '/lingermyth',
		'/a/about': '/about',
		'/w/baron': '/the-barons-old-fleet',
		'/w/stars': '/a-necklace-of-stars',
		'/a/yearn': '/on-yearning',
	},
});
