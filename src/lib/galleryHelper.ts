export function resolveGalleryTitle(g: any) {
    const title = g?.data?.title ?? "";
    return title.replace("//", " ");
}

export function getGalleryLinkAlt(g: any) {
    const description = g?.data?.description;
    const type = g?.data?.isLocation ? "On Location" : "Photography Gallery";
    return type + ": " + resolveGalleryTitle(g) + (description ? ` - ${description}` : "");
}