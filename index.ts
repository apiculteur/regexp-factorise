export function factorize(elements: Array<string>): string {
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
        if (hasCommonFirstChar(elements)) {
            return (
                elements[0][0] + 
                factorize(elements.map(element => 
                    element.slice(1)
                ))
            );
        } else {
            return '(' + elements.join('|') + ')';
        }
    }
}

function hasOnlySingleChar(elements: Array<string>) {
    return !~elements.findIndex(str => str.length !== 1);
}

function hasCommonFirstChar(elements: Array<string>) {
    const firstsChar = new Set(elements.map(str => str[0]));
    return firstsChar.size < elements.length;
}

type AST = null | string | { [part: string]: null | Array<AST> } ;

/*
    const ast: AST = elements.reduce((result, id) => {
        if (result === null) {
            return id;
        } else if (typeof result === 'string') {
            if (result[0] === id[0]) {
                let length = 1;
                while (result[length] === id[length]) {
                    length += 1;
                }
                return { 
                    [result.slice(0, length)]: [
                        result.slice(length), 
                        id.slice(length)
                    ]
                };
            } else {
                return {
                    [result]: null,
                    [id]: null
                };
            }
        } else if (typeof result === 'object') {
            const keys = Object.keys(result).sort();
            for (const key of keys) {
                for (let i = 0; i < key.length; i += 1) {

                }
            }
        }
    }, null);
*/