import { marked } from "marked";

const staticLinks = {
    home: "/",
    instagram: "https://instagram.com/probablyduncan",
    linkedin: "https://linkedin.com/in/probablyduncan",
    email: "mailto:duncanpetrie1@gmail.com",
    mailto: "mailto:duncanpetrie1@gmail.com"
} as const;


export function resolveMarkdownLinks(markdownInput: string) {
    return marked.parseInline(markdownInput, { renderer: markedRendererWithLink() });
}

export function markedRendererWithLink(renderer = new marked.Renderer()) {
    renderer.link = ({ href, title, text }) => {
        const { href: hrefResolved, title: titleResolved, rel, target } = resolveLink({ href, title, innerHtml: text });
        return `<a href="${hrefResolved}" title="${titleResolved}" target="${target}" rel="${rel}">${text}</a>`;
    }
    return renderer;
}

export function resolveLink({ href, title, innerHtml, forceNewTab }: {
    href: string
    title?: string
    innerHtml?: string
    forceNewTab?: boolean
}): {
    href: string,
    title: string,
    target: '_blank' | '_self',
    rel: 'noopener noreferrer' | '',
} {

    const innerText = stripHtmlTags(innerHtml);
    const innerTextLower = innerText.toLowerCase();
    if (!href) {
        if (innerTextLower in staticLinks) {
            href = staticLinks[innerTextLower as keyof typeof staticLinks];
        }
        else {
            href = "/" + innerTextLower.replace(' ', '-');
        }
    }
    else if (href.toLowerCase() in staticLinks) {
        href = staticLinks[href.toLowerCase() as keyof typeof staticLinks];
    }

    // should use new tab if external link or pdf
    const useNewTab = forceNewTab || href.startsWith("http") || href.startsWith("mailto") || href.endsWith("pdf");

    return {
        href,
        title: title ?? (useNewTab ? href : innerText),
        target: useNewTab ? '_blank' : '_self',
        rel: useNewTab ? 'noopener noreferrer' : '',
    }
}

export function stripHtmlTags(html: string) {

    if (!html || !html.length) {
        return "";
    }

    let text = html;
    while (text.includes("<") || text.includes(">")) {
        const leftIndex = text.indexOf("<");
        const rightIndex = text.indexOf(">");

        if (leftIndex === -1) {
            text = text.substring(rightIndex + 1);
        } else if (rightIndex === -1) {
            text = text.substring(0, leftIndex);
        } else {
            text = text.substring(0, leftIndex) + text.substring(rightIndex + 1);
        }
    }

    return text;
}