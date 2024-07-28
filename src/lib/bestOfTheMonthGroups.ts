import { getPhotosByRating, type PhotoData } from "./photoHelper";

export interface BestOfTheMonthGroup {
    display: string;
    monthLongName: string;
    lastOfMonth: number;
    year: number;
    slug: string;
    items: PhotoData[];
}

/**
 * all photos, grouped by month, sorted by rating
 */
let _allGroups: BestOfTheMonthGroup[];
export function getBestOfTheMonthGroups(): BestOfTheMonthGroup[] {
    if (!_allGroups) {
        _allGroups = getPhotosByRating(0).sort((a, b) => (b.date.getFullYear() * 1000 + b.date.getMonth() * 10 + b.rating) - (a.date.getFullYear() * 1000 + a.date.getMonth() * 10 + a.rating)).reduce((result, photo) => {
            const displayName = new Intl.DateTimeFormat("default", {
                month: "short",
                year: "numeric",
            }).format(photo.date);

            const groupIndex = result.findIndex(
                (group) => group.display === displayName,
            );
            if (groupIndex === -1) {
                const monthName = new Intl.DateTimeFormat("default", {
                    month: "long",
                }).format(photo.date);

                const lastOfMonthDate = new Date(photo.date);
                lastOfMonthDate.setMonth(lastOfMonthDate.getMonth() + 1);
                lastOfMonthDate.setDate(0);

                result.push({
                    display: displayName,
                    slug: displayName.replaceAll(" ", "-").toLowerCase(),
                    monthLongName: monthName,
                    lastOfMonth: lastOfMonthDate.getDate(),
                    year: photo.date.getFullYear(),
                    items: [photo],
                });
            } else {
                result[groupIndex].items.push(photo);
            }

            return result;
        }, []);
    }

    return _allGroups;
}