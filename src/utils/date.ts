import weddingConfig from "@/config/wedding.config"

export const getWeddingDate = (): Date => {
    const dateStr = weddingConfig.date.time ? 
        weddingConfig.date.date + 'T' + weddingConfig.date.time
        : weddingConfig.date.date

    return new Date(dateStr)
}

export const formatDate = (date: Date): string => {
    // Get the day with the appropriate ordinal suffix
    const day = date.getDate();
    const dayWithSuffix = day + getOrdinalSuffix(day);

    const formattedDate = date.toLocaleString('en-US', {
        month: 'long',
    });

    return `${formattedDate} ${dayWithSuffix}, ${date.getFullYear()}`;
}

const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}