export function shuffleRef<ArrayType>(a: ArrayType[], i1?: number, i2?: number, e?: ArrayType): void {
    i2 = a.length;
    while (i2) (i1 = (Math.random() * i2--) | 0), (e = a[i2]), (a[i2] = a[i1]), (a[i1] = e);
}


export function shuffle<ElementType>(input: ElementType[]): ElementType[] {
    return input.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

export function groupByKey<ElementType>(array: ElementType[], groupByKey: keyof ElementType): Record<string, ElementType[]> {
    return array.reduce((aggregate: any, element: ElementType) => {
        (aggregate[element[groupByKey]] = aggregate[element[groupByKey]] || []).push(element);
        return aggregate;
    }, {});
}

export function groupByPredicate<ElementType>(array: ElementType[], predicate: (element: ElementType) => string): Record<string, ElementType[]> {
    return array.reduce((result: any, element: ElementType) => {
        const groupKey = predicate(element);
        if (result[groupKey] === undefined) {
            result[groupKey] = [];
        }
        result[groupKey].push(element);
        return result;
    }, {});
}

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export function getOrdinalSuffix(i: number) {
    const modTen = i % 10,
        modHundred = i % 100;
    if (modTen === 1 && modHundred !== 11) {
        return "st";
    }
    if (modTen === 2 && modHundred !== 12) {
        return "nd";
    }
    if (modTen === 3 && modHundred !== 13) {
        return "rd";
    }
    return "th";
}