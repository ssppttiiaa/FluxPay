import {
    formatRupiah,
    removeRupiah,
    shortCurrency
} from "../utils/currencyUtils";

export const testCurrency = async () => {

    console.log("===== CURRENCY =====");

    console.log(
        formatRupiah(186000)
    );

    console.log(
        shortCurrency(186000)
    );

    console.log(
        removeRupiah("Rp186.000")
    );

};