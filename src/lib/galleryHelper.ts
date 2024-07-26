export function resolveGalleryTitle(g: any) {
    const title = g?.data?.title ?? "";
    return title.replace("//", " ");
}

export function getGalleryLinkAlt(g: any) {
    const description = g?.data?.description;
    return "Photography Gallery: " + resolveGalleryTitle(g) + (description ? ` - ${description}` : "");
}