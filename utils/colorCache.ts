/**
 * Global cache for average colors extracted from project images.
 * This ensures visual consistency when switching languages or themes.
 */
const colorMap = new Map<string, string>();

export const getColorFromCache = (imageUrl: string): string | null => {
    return colorMap.get(imageUrl) || null;
};

export const saveColorToCache = (imageUrl: string, color: string): void => {
    if (imageUrl && color) {
        colorMap.set(imageUrl, color);
    }
};
