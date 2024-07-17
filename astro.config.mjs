import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import photoImport from './tools/integrations/photoImportIntegration';
import mdxComponentMapIntegration from './tools/integrations/mdxComponentMapIntegration';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://probablyduncan.github.io',
	base: 'duncanpetrie.astro',
	integrations: [
		mdx({
			remarkPlugins: [mdxComponentMapIntegration],
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
