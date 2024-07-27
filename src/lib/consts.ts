/**
 * 
 * REORGANIZE THIS IN THE FUTURE
 * ONCE YOU KNOW WHAT'S GOING ON
 * 
 */


const SYMBOLS = "¶⁋⁜※⌂↷↶↻↺▱▢▭▯▯▤▧▦▩▨▥◐◑◧◨◫◱⨝◩ↂ◧⨏⩈◫↑↟↡↧↥↾↿⇑⇈⇞⇡⇧⇧⇩⇮⇱⇵△▲◭◮∆∇∧∨⋀⋁ↆ⩑⩒↓⇃⇂⇊⇓⇣⇩⇲▼▽⋁⨈ↂↀↈ◩◘◪ↆ∘⊡↪↷↶▨▦▧▤◊▣▶◄►◌◑◨◢◣◥◤◙●◯◮◭ ▪∗⨰⪦⪧※⁕†«»←→⇐⇒⇱⇲◀▶◁▷◂▸◃◃▹⪦⪧⫷⫸⫹⫺⩘∴∳∲§"
const arrowOptions = [
    "⇂↾",
    "⇃↿",
    "⩒⩑",
    "▼▲",
    "⇲◮",
    "▽△",
    "⇲⇱",
    "↓↑",
    "↡↟",
    "⇓⇑",
    "⇣⇡",
    "⇩⇧",
    "⋁⋀",
    "↧↥",
    "ↆ",
];


//#region site information


export const SITE_TITLE = 'Duncan Petrie';
export const SITE_DESCRIPTION = 'Huzzah!';

//#endregion


//#region photo import

import type { PhotoName } from "../data/photoTypes.generated";
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

export const LEGEND_DATA = {
    'settlement': '•',
    'ruin': '⁘',
    'archive': '◭',
    'photography': '☼',
    'writing': '⩛',
    'film': 'ↁ',
    'lyric & verse': '⨕',
    'road': '─',
    'road (unpaved)': '--',
    'road (loopy)': '⅏',
    'story': '†',
    'photobook': '◱',
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
    About: "/about",
    Photography: "/photography",
    Writing: "/writing",
    Springtide: "/springtide",
    Galleries: "/photography",
    "The Permanent Collection": "/photography/permanent-collection",
    "Design Ethos": "/design",

    "Email me": "mailto:duncanpetrie1@gmail.com",
    Instagram: "https://instagram.com/probablyduncan",
    Youtube: "https://www.youtube.com/channel/UCdyoMZUOsWzPmZN-H916jxg",
    Linkedin: "https://linkedin.com/probablyduncan",

    "Pizza Party": "/pizza",
    Wikimedia: "https://www.youtube.com/watch?v=JRXZAaDxGCQ",
    "On Yearning": "/on-yearning",
    Horizons: "/photography/horizons",
    "Birds With Hats": "/photography/birdhat",
    "Birds Without Hats": "/photography/birds",

    "Myth.pdf": "/myth.pdf",
    "Yearning.pdf": "/yearning.pdf",
    "Resume.pdf": "/resume.pdf",

    "Who am I?": "/about",
    "What am I?": "/about",
    "Sign in": "/signin",
} as const;
export type TickerLink = keyof typeof TICKER_LINKS;



//#endregion