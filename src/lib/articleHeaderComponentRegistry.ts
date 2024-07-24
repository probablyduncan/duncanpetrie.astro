import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import BlockHeader from "../components/articleHeaders/BlockHeader.astro";
import ImageHeader from "../components/articleHeaders/ImageHeader.astro";
import YearningHeader from "../components/articleHeaders/YearningHeader.astro";
import FooterMono from "../components/FooterMono.astro";
import FooterSerif from "../components/FooterSerif.astro";
import type { ImageProps, SideClass } from "../env";

export interface ArticleLayoutOptionsBase {
    type: string;
    header?: AstroComponentFactory;
    footer?: AstroComponentFactory;
    useDocumentFence?: boolean;
    lineNumbers?: boolean;
    textWidth?: string;
    textSize?: "small" | "large";
    articleEndDots?: boolean;
    ticker?: boolean;
}

export interface ArticleDefaultLayoutOptions extends ArticleLayoutOptionsBase {
    type: "default"
    metadata?: ArticleMetadataOptions
    image?: ImageProps
}
export interface ArticlePoetryLayoutOptions extends ArticleLayoutOptionsBase {
    type: "poetry";
    subtitle?: string;
    image?: ImageProps;
}
export interface ArticleYearningLayoutOptions extends ArticleLayoutOptionsBase {
    type: "yearning";
    image?: ImageProps
    subtitle?: string
    subtitleAlign?: SideClass
    bottomLeft?: string
    bottomRight?: string
    titleRems?: number
    subtitleRems?: number
    metadata?: ArticleMetadataOptions
}

export type ArticleLayoutOptions = ArticleDefaultLayoutOptions | ArticlePoetryLayoutOptions | ArticleYearningLayoutOptions;

export interface ArticleMetadataOptions {
    abstract?: string;
    tags?: Record<string, string | boolean>;
    tagSpacing?: number[];
}

export const articleLayoutOptionDefaults: { [K in ArticleLayoutOptions['type']]: Omit<Extract<ArticleLayoutOptions, { type: K }>, "type"> } = {
    default: {
        header: ImageHeader,
        footer: FooterSerif,
        useDocumentFence: true,
        lineNumbers: true,
        textWidth: '800px',
        textSize: 'small',
        articleEndDots: true,
        ticker: true,
        metadata: null,
    },
    poetry: {
        header: BlockHeader,
        footer: FooterMono,
        useDocumentFence: false,
        lineNumbers: false,
        textWidth: '400px',
        textSize: 'small',
        articleEndDots: false,
        ticker: true,
    },
    yearning: {
        header: YearningHeader,
        footer: FooterSerif,
        useDocumentFence: true,
        lineNumbers: true,
        subtitleAlign: "right",
        textWidth: '800px',
        textSize: 'small',
        articleEndDots: true,
        ticker: true,
    }
}