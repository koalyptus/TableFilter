/**
 * Sorting utilities
 */

export const ignoreCase = (a, b) => {
    let x = a.toLowerCase();
    let y = b.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

export const numSortAsc = (a, b) => (a - b);

export const numSortDesc = (a, b) => (b - a);
