import { cache } from "react";
import type { Locale } from "./config";

const dictionaries = {
  sq: () => import("./dictionaries/sq.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = cache(async (locale: Locale) =>
  dictionaries[locale]()
);

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// ─── Legal dictionaries ───────────────────────────────────────────
// Split from the main dictionary so the i18n bundle for legal/* pages
// doesn't balloon the hero-page payload.

const legalDictionaries = {
  sq: () => import("./dictionaries/legal/sq.json").then((m) => m.default),
  en: () => import("./dictionaries/legal/en.json").then((m) => m.default),
};

export const getLegalDictionary = cache(async (locale: Locale) =>
  legalDictionaries[locale]()
);

export type LegalDictionary = Awaited<ReturnType<typeof getLegalDictionary>>;
