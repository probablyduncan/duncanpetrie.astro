import type { HomePageThemeBase, ColorScheme, IndexTheme } from "../env";

export const HomePageLightColorThemes: HomePageThemeBase[] = [
    {
        name: "green",
        photoName: "high-castle-london-2024-05-13",
        titleAlign: "left",
        text: "#222",
        background: "#F1F5F0",
        accent: "#668863",
    },
    {
        name: "red",
        photoName: "sea-wall-broadstairs-2023-09-04",
        titleAlign: "right",
        text: "#222",
        background: "#F5F4F4",
        accent: "#CD846C",
    },
    {
        name: "brown",
        photoName: "st-annes-court-herne-bay-2024-01-15",
        titleAlign: "left",
        text: "#222",
        background: "#E6EEFF",
        accent: "#AE805B",
    },
    {
        name: "purple",
        photoName: "catclaws-pennance-point-2021-10-09",
        titleAlign: "left",
        text: "#222",
        background: "#FFFBFF",
        accent: "#C3A9C2",
    },
    {
        name: "yellow",
        photoName: "flaxengrass-falmouth-2021-10-15",
        titleAlign: "right",
        text: "#222",
        background: "#F2F9FF",
        accent: "#F4AD58",
    },
    {
        name: "blue",
        photoName: "cloudswells-falmouth-2021-11-02",
        titleAlign: "left",
        text: "#222",
        background: "#FAFAFF",
        accent: "#687A92",
    },
    {
        name: "orange",
        photoName: "vacant-post-penzance-2021-11-02",
        titleAlign: "right",
        text: "#222",
        background: "#F5F4F4",
        accent: "#E9A77D",
    },
    {
        name: "pinacle",
        photoName: "le-pinacle-les-landes-jersey-2024-05-25",
        titleAlign: "left",
        text: "#222",
        background: "#FAFBF7",
        accent: "#B37749",
    },
    // {
    //     name: "yellowfield",
    //     photoName: "st-catherines-oratory-isle-of-wight-2024-04-28",
    //     titleAlign: "right",
    //     text: "#222",
    //     background: "#EDF4FF",
    //     accent: "#2677BD",
    // },
    {
        name: "corbiere",
        photoName: "la-corbiere-st-brelade-jersey-2024-05-25",
        titleAlign: "right",
        text: "#222",
        background: "#F6F8FA",
        accent: "#987a62",
    },
] as const;

export const HomePageDarkColorThemes: HomePageThemeBase[] = [
    {
        name: "green",
        photoName: "cycling-gudmundsen-drive-door-county-2019-08-31",
        titleAlign: "left",
        text: "#F1F5F0",
        background: "#222",
        accent: "#94A439",
    },
    {
        name: "red",
        photoName: "surrogate-sea-villajoyosa-2022-02-18",
        titleAlign: "left",
        text: "#F5F4F4",
        background: "#222",
        accent: "#F47665",
    },
    {
        name: "purple",
        photoName: "toenail-moon-maenporth-2021-01-16",
        titleAlign: "left",
        text: "#FFFBFF",
        background: "#222",
        accent: "#DACEFF",
    },
    {
        name: "brown",
        photoName: "parchment-paper-window-margate-2023-09-04",
        titleAlign: "left",
        text: "#E6EEFF",
        background: "#222",
        accent: "#DFB280",
    },
    {
        name: "yellow",
        photoName: "window-safari-primrose-hill-2024-05-13",
        titleAlign: "left",
        text: "#F2F9FF",
        background: "#222",
        accent: "#F5CA01",
    },
    {
        name: "blue",
        photoName: "vacant-post-penzance-2021-11-02",
        titleAlign: "left",
        text: "#E6EEFF",
        background: "#222",
        accent: "#9BC0F4",
    },
    {
        name: "orange",
        photoName: "jubilee-pool-penzance-2021-11-02",
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


export const PhotographyIndexThemes: IndexTheme[] = [
    {
        photoName: "oak-leaf-rothamstead-2023-11-23",
        textColor: "#462012",
    },
    {
        photoName: "pasture-ii-2021-01-02",
        textColor: "#474545",
    },
    {
        photoName: "north-atlantic-pennance-point-2021-01-14",
        textColor: "#f0f7ff",
    },
    {
        photoName: "mosquitoes-i-door-bluff-2021-06-02",
        textColor: "#fff",
    },
    {
        photoName: "sand-st-brelades-bay-jersey-2024-05-25",
        textColor: "#483018",
    },
    {
        photoName: "lonely-crag-iceland-2018-06-15",
        textColor: "#fff",
    },
    {
        photoName: "north-pacific-from-kalaloch-washington-2018-03-22",
        textColor: "#fff",
    },
]