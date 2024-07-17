import type { HomePageThemeBase, ColorScheme } from "../env";

export const HomePageLightColorThemes: HomePageThemeBase[] = [
    {
        name: "green",
        photoName: "highcastle",
        titleAlign: "left",
        text: "#222",
        background: "#F1F5F0",
        accent: "#668863",
    },
    {
        name: "red",
        photoName: "broadstairs",
        titleAlign: "right",
        text: "#222",
        background: "#F5F4F4",
        accent: "#CD846C",
    },
    {
        name: "brown",
        photoName: "stannescourt",
        titleAlign: "left",
        text: "#222",
        background: "#E6EEFF",
        accent: "#AE805B",
    },
    {
        name: "purple",
        photoName: "catclaws",
        titleAlign: "left",
        text: "#222",
        background: "#FFFBFF",
        accent: "#C3A9C2",
    },
    {
        name: "yellow",
        photoName: "flaxengrass",
        titleAlign: "right",
        text: "#222",
        background: "#F2F9FF",
        accent: "#F4AD58",
    },
    {
        name: "blue",
        photoName: "fluffycloud",
        titleAlign: "left",
        text: "#222",
        background: "#FAFAFF",
        accent: "#687A92",
    },
    {
        name: "orange",
        photoName: "penzancewait",
        titleAlign: "right",
        text: "#222",
        background: "#F5F4F4",
        accent: "#E9A77D",
    },
] as const;

export const HomePageDarkColorThemes: HomePageThemeBase[] = [
    {
        name: "green",
        photoName: "cycling",
        titleAlign: "left",
        text: "#F1F5F0",
        background: "#222",
        accent: "#94A439",
    },
    {
        name: "red",
        photoName: "surrogatesea",
        titleAlign: "left",
        text: "#F5F4F4",
        background: "#222",
        accent: "#F47665",
    },
    {
        name: "purple",
        photoName: "toenailmoon",
        titleAlign: "left",
        text: "#FFFBFF",
        background: "#222",
        accent: "#DACEFF",
    },
    {
        name: "brown",
        photoName: "paperwindow",
        titleAlign: "left",
        text: "#E6EEFF",
        background: "#222",
        accent: "#DFB280",
    },
    {
        name: "yellow",
        photoName: "windowsafari",
        titleAlign: "left",
        text: "#F2F9FF",
        background: "#222",
        accent: "#F5CA01",
    },
    {
        name: "blue",
        photoName: "diningroom",
        titleAlign: "left",
        text: "#E6EEFF",
        background: "#222",
        accent: "#9BC0F4",
    },
    {
        name: "orange",
        photoName: "jubileepool",
        titleAlign: "left",
        text: "#F5F4F4",
        background: "#222",
        accent: "#F1974B",
    },
] as const;
export type HomePageThemeName = typeof HomePageDarkColorThemes[number]['name'] | typeof HomePageLightColorThemes[number]['name'];


export const DefaultThemeScheme: ColorScheme = {
    text: '#222',
    background: '#FFF',
    accent: 'blue',
}