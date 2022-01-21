export function factorizeOr(elements: Array<string>): string {
    if (elements.length === 0) {
        return '';
    } else if (elements.length === 1) {
        return elements[0];
    } else if (hasOnlySingleChar(elements)) {
        if (elements.length === 2) {
            return '[' + elements.join('') + ']';
        } else {
            const part = [] as Array<string>;
            const list = elements.slice().sort();
            while (list.length > 0) {
                if (list.length === 1) {
                    part.push(...list.splice(0, 1));
                    break ;
                }
                const ref = list[0].charCodeAt(0);
                for (let i = 1; i < list.length; i += 1) {
                    const charCode = list[i].charCodeAt(0);
                    if (i + 1 === list.length || charCode > ref + i) {
                        if (i + 1 >= 3) {
                            const plusOne = charCode === ref + i ? 1 : 0;
                            const range = list.splice(0, i + plusOne);
                            part.push(range[0] + '-' + range[range.length - 1]);
                        } else {
                            part.push(...list.splice(0, i));
                            break ;
                        }
                    }
                }
            }
            return '[' + part.sort().join('') + ']';
        }
    } else {
        const cases: Array<string> = [];
        for (const [hasCommonFirstChar, group] of groupElements(elements)) {
            if (hasCommonFirstChar) {
                cases.push(
                    group[0][0] + 
                    factorizeOr(group.map(element => element.slice(1)))
                );
            } else {
                cases.push(...group);
            }
        }
        if (cases.length > 1) {
            return '(?:' + cases.join('|') + ')';
        } else {
            return cases[0];
        }
    }
}

function hasOnlySingleChar(elements: Array<string>) {
    return !~elements.findIndex(str => str.length !== 1);
}

function* groupElements(
    elements: Array<string>
): Generator<[boolean, Array<string>], void> {
    const list = elements.slice();
    const singles: Array<string> = [];
    while (list.length > 0) {
        const group: Array<string> = [];
        const reference = list.shift();
        for (let i = 0; i < list.length;) {
            if (reference[0] === list[i][0]) {
                group.push(...list.splice(i, 1));
            } else {
                i += 1;
            }
        }
        if (group.length === 0) {
            singles.push(reference);
        } else {
            yield [true, [reference].concat(group)];
        }
    }
    if (singles.length > 0) {
        yield [false, singles];
    }
}
