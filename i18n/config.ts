export const locales = ["sq", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sq";
