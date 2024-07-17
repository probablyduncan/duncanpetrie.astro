/**
 * 
 * REORGANIZE THIS IN THE FUTURE
 * ONCE YOU KNOW WHAT'S GOING ON
 * 
 */




//#region site information

import type { PhotoName } from "../data/photoTypes.generated";

export const SITE_TITLE = 'Duncan Petrie';
export const SITE_DESCRIPTION = 'Huzzah!';

//#endregion


//#region util types

// export type SideLR = 'left' | 'right';
// export type SideLRB = 'left' | 'right' | 'both';
// export type SideLRC = 'left' | 'right' | 'center';
// export type SideLRCJ = 'left' | 'right' | 'center' | 'justify';
// export type SideLRBC = 'left' | 'right' | 'both' | 'center';

//#endregion




//#region photo import

export const SIZE_DATA = {
    large: {
        ext: '_l.webp',
        width: 2000,
        webp: {
            quality: 80,
            effort: 6,
        },
    },
    medium: {
        ext: '_m.webp',
        width: 800,
        webp: {
            quality: 80,
            effort: 6,
        },
    },
    small: {
        ext: '_s.webp',
        width: 400,
        webp: {
            quality: 80,
            effort: 6
        },
    }
} as const;

export type ImageSize = keyof typeof SIZE_DATA;
export type SizeData = typeof SIZE_DATA[ImageSize];

//#endregion



//#region filters/pages/links

const otherones = '¶⁋⁜※⌂↷↶↻↺▱▢▭▯▯▤▧▦▩▨▥◐◑◧◨◫◱'
export const LEGEND_DATA = {
    'settlement': '•',
    'ruin': '⁘',
    'archive': '◭',
    'photography': '☼',
    'writing': '⩛',
    'film': 'ↁ', // ⨝◩ↂ
    'lyric & verse': '⨕', // ⨏⩈
    'road': '─',
    'road (unpaved)': '--',
    'road (loopy)': '⅏',
    'story': '†',
    'photobook': '◱',   // ◧ ◫
    'farm': '⌂',
    'ritual stone': '⁜',
} as const;
export type LegendLabel = keyof typeof LEGEND_DATA;


export interface ListItem {
    title: string,
    url: string,
    type?: LegendLabel,
    alt?: string,
    imgSrc?: string,
    photoName?: PhotoName,
}
export type ListData = { name: string, items: ListItem[] }[]


export const TICKER_LINKS = {
    Home: "/",
    Photography: "/photography",
    Writing: "/writing",
    Springtide: "/springtide",
    About: "/about",
    Galleries: "/g",
    "The Permanent Collection": "/permanent-collection",
    "Design Ethos": "/design",

    "Email me": "mailto:duncanpetrie1@gmail.com",
    Instagram: "https://instagram.com/probablyduncan",
    Youtube: "https://www.youtube.com/channel/UCdyoMZUOsWzPmZN-H916jxg",
    Linkedin: "https://linkedin.com/probablyduncan",

    "Pizza Party": "/pizza",
    Wikimedia: "/wiki",
    "On Yearning": "/on-yearning",
    Horizons: "/horizons",
    "Birds With Hats": "/birdhat",
    "Birds Without Hats": "/g/birds",

    "Myth.pdf": "/myth.pdf",
    "Yearning.pdf": "/yearning.pdf",
    "Resume.pdf": "/resume.pdf",

    "Who am I?": "/about",
    "What am I?": "/about",
    "Sign in": "/signin",
    "Sign out": "/signout",
} as const;
export type TickerLink = keyof typeof TICKER_LINKS;



//#endregion