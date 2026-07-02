export const formatDate = (date) => {

    const d = new Date(date);

    return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

};

export const getToday = () => {

    return new Date().toISOString().split("T")[0];

};

export const diffDays = (date) => {

    const today = new Date(getToday());

    const target = new Date(date);

    const diff = target - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));

};

export const isReminder7 = (date) => {

    return diffDays(date) === 7;

};

export const isReminder3 = (date) => {

    return diffDays(date) === 3;

};

export const isReminder1 = (date) => {

    return diffDays(date) === 1;

};

export const isExpired = (date) => {

    return diffDays(date) < 0;

};