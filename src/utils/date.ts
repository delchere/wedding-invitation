import weddingConfig from "@/config/wedding.config"

const WAT_OFFSET_HOURS = 1

export const getWeddingDate = (): Date => {
    const { date, time } = weddingConfig.date
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = (time || '11:30').split(':').map(Number)

    return new Date(Date.UTC(year, month - 1, day, hours - WAT_OFFSET_HOURS, minutes))
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