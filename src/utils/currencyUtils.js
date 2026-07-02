export const formatRupiah = (number = 0) => {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);

};

export const removeRupiah = (text = "") => {

    return Number(
        text
            .replace(/[^\d]/g, "")
    );

};

export const shortCurrency = (number = 0) => {

    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + " Jt";
    }

    if (number >= 1000) {
        return (number / 1000).toFixed(1) + " Rb";
    }

    return number.toString();

};