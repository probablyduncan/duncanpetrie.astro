import type { AstroIntegration } from "astro";
import { importPhotos } from "../../src/lib/photoHelper";

export default function photoImport(): AstroIntegration {
    return {
        name: "photo-import",
        hooks: {
            "astro:build:start": ({ logger }) => {
                logger.info('Beginning photo import...')
                importPhotos();
                logger.info('Photo import completed.');
            }
        }
    }
}