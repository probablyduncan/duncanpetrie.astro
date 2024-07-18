/**
 * 
 * LIGHTROOM/EXPORT/IMPORT NOTES
 * 
 * Caption: 
 *  - should be the name of the photo, like 'Pole over field, St. Mawes'
 *  - first letter capitalized, comma, location
 *  - should not end in period
 * 
 * Location, City, State/Province, Country are all added to Keywords (Tags)
 *  - duplicates will be removed
 *  - all will be lowercase
 *  - use spaces/punctuation when necessary
 *  - these tags will be used for filters in ui
 * 
 * Run `npm run photoimport` to generate images and metadata
 * 
 * 
 * 
 * DITHERING POSSIBLE LIBRARIES:
 *  - Vibrant (only generates palette) https://www.npmjs.com/package/@behold/sharp-vibrant
 *  - RgbQuant (needs virtual canvas?) https://www.npmjs.com/package/rgbquant
 *  - Virtual canvas https://www.npmjs.com/package/canvas
 *  - GraphicsMagick has an orderedDither fn https://www.npmjs.com/package/gm
 * 
 */



import fs from 'fs';
import path from 'path'
import exifr from 'exifr'
import sharp from 'sharp'
import type { PhotoName } from '../data/photoTypes.generated';
import { SIZE_DATA, type ImageSize, type SizeData } from './consts';


//#region PhotoData types

interface IPhotoDataBase {

    name: PhotoName;
    paths: Record<ImageSize, string>

    caption: string;
    datestring: string;
    tags: string[];
    rating: number;

    camera: string;
    lens: string;
    focallength: string;
    aperture: number;
    shutter: number;
    iso: number;

    ratio: number;
}

interface PhotoDataJSONEntry extends IPhotoDataBase { }
class PhotoDataJSONEntry implements IPhotoDataBase {

    constructor(name: string, paths: Record<ImageSize, string>, exif: any, sharpMetadata: sharp.Metadata) {

        this.name = name as PhotoName;
        this.paths = paths;

        this.caption = exif.Caption;
        this.datestring = exif.DateTimeOriginal;
        this.rating = exif.Rating ?? 0;

        this.camera = exif.Model;
        this.lens = exif.LensModel;
        this.focallength = exif.FocalLength;
        this.aperture = exif.FNumber;
        this.shutter = exif.ExposureTime;
        this.iso = exif.ISO;

        this.ratio = sharpMetadata.width / sharpMetadata.height;

        // add explicit tags and additional tags
        if (typeof exif.Keywords === typeof []) {
            this.tags = exif.Keywords.map((tag: string) => tag.toLowerCase());
        }
        else if (typeof exif.Keywords === typeof '') {
            this.tags = [exif.Keywords];
        }
        else {
            this.tags = [];
        }
        PhotoDataJSONEntry.additionalTags.forEach(tag => this.addTagIfExists(exif[tag]));
    }

    private static additionalTags: string[] = ['Sublocation', 'City', 'State', 'Country', 'Location'] as const;
    private addTagIfExists(tag: string) {

        if (!tag) {
            return;
        }

        tag = tag.toLowerCase();
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }
}

interface IPhotoDataEnhanced extends IPhotoDataBase {

    date: Date;
    joinedCaption: string;
    joinedSettings: string;
    joinedCamLens: string;
}

export interface PhotoData extends IPhotoDataEnhanced { }
export class PhotoData implements IPhotoDataEnhanced {

    constructor(json: PhotoDataJSONEntry) {
        Object.assign(this, json);

        this.date = new Date(json.datestring);
        this.joinedCaption = json.caption ? `${json.caption}. ${this.date.getFullYear()}.` : '';
        this.joinedSettings = `1/${1 / json.shutter} sec, f/${json.aperture}, ISO ${json.iso}.`;
        this.joinedCamLens = `${json.lens}. ${json.camera}.`;
    }
}

//#endregion










//#region public photo getters

export function getPhotoByName(name: PhotoName): PhotoData {
    return getPhotosByKeyValue('name', name).find(() => true);
}

// export function getPhotoByTitle(title: string): PhotoData {
//     return getPhotosByKeyValue('title', title).find(e => true);
// }

export function getPhotosByMonth(dateInMonth: Date): PhotoData[] {
    const month = dateInMonth.getMonth();
    return getPhotos((photo) => photo.date.getMonth() === month);
}

export function getPhotosByTags(...searchTags: string[]): PhotoData[] {

    if (!searchTags || !searchTags.length) {
        return [];
    }

    return getPhotos((photo) => photo.tags.some(tag => searchTags.includes(tag)));
}

export function getPhotosByRating(rating: number): PhotoData[] {
    return getPhotos((photo) => photo.rating >= rating);
}

//#endregion

//#region private photo getters

function getPhotosByKeyValue(key: string, value: any) {
    return getPhotos((photo) => photo[key as keyof PhotoData] === value);
}

function getPhotos(filter: (photoData: PhotoData) => boolean): PhotoData[] {
    return getAllPhotoData().filter(filter);
}

let _photoData: PhotoData[];
function getAllPhotoData(): PhotoData[] {

    if (!_photoData) {
        _photoData = readPhotoDataJSON().map((data: PhotoDataJSONEntry) => new PhotoData(data));
    }

    return _photoData;
}

function readPhotoDataJSON(): PhotoDataJSONEntry[] {

    if (!fs.existsSync(PHOTO_DATA_PATH)) {
        return [];
    }

    const jsonBuffer = fs.readFileSync(PHOTO_DATA_PATH);
    return JSON.parse(jsonBuffer.toString()) as PhotoDataJSONEntry[];
}
//#endregion





export async function getImgSize(src?: string): Promise<{ width: number; height: number; ratio: number; }> {

    const nogood: any = { width: 0, height: 0, ratio: 0 };

    if (!src) {
        return nogood;
    }

    const fullPath = path.join(process.cwd(), 'public', src);

    if (!fullPath) {
        return nogood;
    }

    const buffer = fs.readFileSync(fullPath)

    if (!buffer) {
        return nogood;
    }

    const metadata = await sharp(buffer).metadata();
    return {
        width: metadata.width,
        height: metadata.height,
        ratio: metadata.width / metadata.height,
    }
}





//#region image/json creation

const GENERATED_IMG_DIR = 'photos'
const PHOTO_SRC_DIR = path.join(process.cwd(), 'src', 'assets', 'photos');
const IMG_DEST_DIR = path.join(process.cwd(), 'public', GENERATED_IMG_DIR);
const PHOTO_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'photoData.generated.json');
const PHOTO_TYPES_PATH = path.join(process.cwd(), 'src', 'data', 'photoTypes.generated.ts');

export async function importPhotos(generateAll: boolean = false) {

    const log = (m: string) => console.log('\x1b[33m', "IMAGE_SETUP >>", "\x1b[0m", m);

    log('beginning image setup');

    // get all image names in /assets
    const imgNames = fs.readdirSync(PHOTO_SRC_DIR);
    const photoData: PhotoDataJSONEntry[] = [];

    // [generated path, img buffer]
    const imagesToWrite: [string, Promise<Buffer>][] = [];

    if (!fs.existsSync(IMG_DEST_DIR)) {
        fs.mkdirSync(IMG_DEST_DIR);
        generateAll = true;
    }
    else if (generateAll) {
        // if dir exists and we're regenerating, first delete all generated images
        fs.rmSync(IMG_DEST_DIR, { recursive: true, force: true });
    }

    log('');
    log('👀  reading photo metadata');
    const allNamesForType: string[] = [];
    const allTagsForType = new Set<string>();
    for (let i = 0; i < imgNames.length; i++) {

        const sourcePath = path.join(PHOTO_SRC_DIR, imgNames[i]);
        const name = path.parse(sourcePath).name;

        // start get exif/metadata
        const buffer = fs.readFileSync(sourcePath);
        const exifPromise = exifr.parse(buffer, true);
        const metadataPromise = sharp(buffer).metadata();

        // iterate through sizes and determine what to generate
        let paths: Record<ImageSize, string> = {} as Record<ImageSize, string>;;
        for (const size in SIZE_DATA) {

            const sizeData: SizeData = SIZE_DATA[size as ImageSize];
            const filename = name + sizeData.ext;
            const filepath = path.join(IMG_DEST_DIR, filename);

            if (generateAll || !fs.existsSync(filepath)) {
                imagesToWrite.push([filepath, sharp(buffer)
                    .resize(sizeData.width, sizeData.width, { fit: 'inside' })
                    .webp(sizeData.webp)
                    .toBuffer()
                ]);
            }

            paths[size as ImageSize] = path.normalize(path.join('/', GENERATED_IMG_DIR, filename));
        }

        photoData[i] = new PhotoDataJSONEntry(name, paths, await exifPromise, await metadataPromise);

        // this stuff will be added to a generated types file
        allNamesForType.push(name);
        photoData[i].tags.forEach(t => allTagsForType.add(t));

        log(`(${i + 1}/${imgNames.length}) \t${imgNames[i]}`);
    }

    log('');
    log(`✍   writing photo types to ${PHOTO_TYPES_PATH}`);
    const typeTS = `export type PhotoName = "${allNamesForType.join('" | "')}";` + '\n\n' + `export type PhotoTag = "${[...allTagsForType].join('" | "')}"`;
    fs.writeFileSync(PHOTO_TYPES_PATH, typeTS);
    log('complete 📄');

    log('');
    log(`✍   writing metadata to ${PHOTO_DATA_PATH}`);

    // first, get existing data ?? merge with added stuff ??
    // const existingData = getPhotoDataJSON();

    fs.writeFileSync(PHOTO_DATA_PATH, JSON.stringify(photoData.sort((a, b) => Date.parse(b.datestring) - Date.parse(a.datestring)), null, 4));
    log('complete 📄');

    if (imagesToWrite.length > 0) {

        log('');;
        log(`📸  writing images to ${IMG_DEST_DIR}`)
        let count = 0;
        imagesToWrite.forEach(async ([filepath, bufferPromise]) => {
            const start = performance.now();
            const buffer = await bufferPromise;
            fs.writeFileSync(filepath, buffer)
            const end = performance.now();
            const elapsed = (end - start);
            log(`(${++count}/${imagesToWrite.length}) \t${elapsed.toPrecision(4)}ms${elapsed > 100 ? ' ⏰' : ''} \t${path.basename(filepath)}`)
        });
    }
}
//#endregion