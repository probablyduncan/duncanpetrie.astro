import { defineCollection, reference, z } from 'astro:content';

// https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod

const articles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.date(),
		location: z.string(),
		colors: z.object({
			text: z.string().optional(),
			background: z.string().optional(),
			accent: z.string().optional(),
		}).optional(),
		related: z.array(reference('articles').or(reference('galleries')).or(reference('springtide'))).optional(),
		metadata: z.record(z.string(), z.string().or(z.boolean()).or(z.any())).optional(),
		star: z.boolean().default(false),
	}).passthrough(),
})

const galleries = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		contentTags: z.array(z.string()).default([]),
		date: z.date(),
		photoTags: z.array(z.string()).default([]),
		photoNames: z.array(z.string()).default([]),
		mediaNames: z.array(z.string()).default([]),
		mediaFolder: z.string().optional(),
		excludeNames: z.array(z.string()).default([]),
		excludeTags: z.array(z.string()).default([]),
		colors: z.object({ text: z.string().optional(), background: z.string().optional(), accent: z.string().optional() }).optional(),
		noCaptions: z.boolean().default(false),
		sort: z.enum(['asc', 'desc', 'asc rating', 'desc rating', 'rating']).default('desc'),
		shuffle: z.boolean().default(false),
		isLocation: z.boolean().default(false),
		star: z.boolean().default(false),
		useColumns: z.boolean().default(true),
	}),
});

const springtide = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		date: z.date(),
		star: z.boolean().default(false),

		// https://docs.astro.build/en/guides/content-collections/#defining-collection-references
		// related: z.array(reference("springtide")).optional()
	}),
})

export const collections = {
	articles,
	galleries,
	springtide,
};
