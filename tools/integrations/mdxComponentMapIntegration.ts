import path from 'path';
import { parse as parseJs } from 'acorn';

/**
 * adds component imports from layout component/html map to mdx files
 */
export default function rehypeAutoImportComponents() {
    return (tree: any, file: any) => {

        let layout = file?.data?.astro?.frontmatter?.layout;

        if (!layout) {
            return;
        }

        layout = path.parse(layout).name.toLowerCase();
        if (!componentMap[layout]) {
            return;
        }

        const components = componentMap[layout];
        const tags = Object.keys(components);
        const imports = tags.map(e => `import ${getName(components[e])} from "${components[e]}";\n`);
        const exports = tags.map(e => `${e}: ${getName(components[e])}`);

        const statement = imports.join("") + "export const components = { " + exports.join(', ') + " }\n";

        tree.children.unshift({
            type: 'mdxjsEsm',
            value: '',
            data: {
                estree: {
                    body: [],
                    ...parseJs(statement, { ecmaVersion: 'latest', sourceType: 'module' }),
                    type: 'Program',
                    sourceType: 'module',
                },
            },
        });
    }
}

function getName(fullPath: string): string {
    return path.parse(fullPath).name;
}

const componentMap: any = {
    articlelayout: {
        a: '../components/Link.astro',
        img: '../components/markdown/MarkdownImage.astro',
    }
}