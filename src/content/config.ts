import { defineCollection, reference, z } from 'astro:content';

// https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod

const gallery = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		contentTags: z.array(z.string()).optional(),
		date: z.coerce.date().optional(),
		photoTags: z.array(z.string()).optional(),
		photoNames: z.array(z.string()).optional(),
		mediaNames: z.array(z.string()).optional(),
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
	g: gallery,
	w: springtideWiki,
};
