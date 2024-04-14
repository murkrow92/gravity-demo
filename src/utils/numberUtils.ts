export const formatDecimalNumber = (number: number) => {
    const maxDigits = 10;
    const asString = number.toFixed(maxDigits);
    return parseFloat(asString).toString();
};
