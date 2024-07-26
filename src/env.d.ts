/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { PhotoName } from "./data/photoTypes.generated";
import { HomePageThemeName } from "./lib/themeConsts";

export { };

export type SideLR = 'left' | 'right';
export type SideLRB = 'left' | 'right' | 'both';
export type SideLRC = 'left' | 'right' | 'center';
export type SideTextAlign = 'left' | 'right' | 'center' | 'justify';
export type SideLRBC = 'left' | 'right' | 'both' | 'center';
export type SideClass = 'left' | 'right' | 'center' | 'justify' | 'justify-last' | 'justify-right' | 'justify-center';

//#region Theme Stuff

declare global {
    interface Window {
        theme: {
            next: () => void;
            refreshData: () => void;
            data: HomePageTheme[];
        };
    }
}

export interface ColorScheme {
    text?: string
    background?: string
    accent?: string
}

export interface HomePageThemeBase extends ColorScheme {
    name: string
    photoName: PhotoName
    titleAlign: SideLR
}

export type HomePageTheme = HomePageThemeBase & {
    src: string
    caption: string
    imgJustify: 'flex-start' | 'flex-end'
    ratio: number
}

//#endregion


export interface ImageProps {
    photoName?: PhotoName;
    size?: ImageSize;
    src?: string;
    caption?: string;
    noCaption?: boolean;
    captionAlign?: SideClass;
    captionAccent?: boolean;
}

export interface IndexListItem {
    href?: string
    title?: string
    display: string
}