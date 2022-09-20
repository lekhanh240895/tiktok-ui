export const configNumber = (number) => {
    if (number >= 1000000000) {
        const newNumber = (number / 1000000000).toFixed(1);

        return newNumber + 'B';
    } else if ((number >= 1000000) & (number < 1000000000)) {
        const newNumber = (number / 1000000).toFixed(1);

        return newNumber + 'M';
    } else if ((number >= 1000) & (number < 1000000)) {
        const newNumber = (number / 1000).toFixed(1);

        return newNumber + 'K';
    } else {
        return number;
    }
};
