import { ColourPalette } from "@/interfaces/colour";

const adjustColorBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const r = (num >> 16) + percent;
    const g = ((num >> 8) & 0x00FF) + percent;
    const b = (num & 0x0000FF) + percent;

    const newColor = (1 << 24) + 
                     (Math.max(0, Math.min(255, r)) << 16) + 
                     (Math.max(0, Math.min(255, g)) << 8) + 
                     Math.max(0, Math.min(255, b));

    return `#${newColor.toString(16).slice(1).toUpperCase()}`;
}

function getContrastTextColor(hex: string): string {
    const num = parseInt(hex.slice(1), 16);
    const r = (num >> 16) & 0xFF;
    const g = (num >> 8) & 0xFF;
    const b = num & 0xFF;

    // Calculate the luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Return black or white text based on luminance
    return luminance > 128 ? '#1A1A1A' : '#FBFBFB';
}

export const generateColorVariations = (hex: string): ColourPalette => {
    const light = adjustColorBrightness(hex, 50);
    const dark = adjustColorBrightness(hex, -90);
    const textContrast = getContrastTextColor(hex);

    return { light, main: hex, dark, textContrast };
}