import { defineCollection, reference, z } from 'astro:content';

// https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod

const articles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.date(),
		colors: z.object({
			text: z.string().optional(),
			background: z.string().optional(),
			accent: z.string().optional(),
		}).optional(),
		ticker: z.boolean().default(true),
		related: z.array(reference('articles')).optional(),
		layoutType: z.string().default('default'),
	}).passthrough(),
})

const galleries = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		contentTags: z.array(z.string()).optional(),
		date: z.coerce.date().optional(),
		photoTags: z.array(z.string()).optional(),
		photoNames: z.array(z.string()).optional(),
		mediaNames: z.array(z.string()).optional(),
		excludeNames: z.array(z.string()).optional(),
		excludeTags: z.array(z.string()).optional(),
		colors: z.object({ text: z.string().optional(), background: z.string().optional(), accent: z.string().optional() }).optional(),
		noCaptions: z.boolean().optional(),
		sort: z.enum(['asc', 'desc']).default('desc'),
	}),
});

const springtideWiki = defineCollection({
	type: 'content',
	schema: {
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		date: z.coerce.date(),
		best: z.boolean().default(false),

		// https://docs.astro.build/en/guides/content-collections/#defining-collection-references
		related: z.array(reference('w'))
	}
})

export const collections = {
	articles,
	galleries,
	w: springtideWiki,
};
