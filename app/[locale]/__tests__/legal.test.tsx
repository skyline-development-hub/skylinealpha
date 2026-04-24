import { describe, it, expect } from "vitest";
import sq from "@/i18n/dictionaries/legal/sq.json";
import en from "@/i18n/dictionaries/legal/en.json";

/**
 * Flattens an object/array into a sorted list of key paths.
 * "privacyPolicy.sections.0.heading", etc.
 * Leaf values (strings/numbers/booleans) are represented by their path.
 */
const keys = (o: unknown, p = ""): string[] => {
  if (o === null || typeof o !== "object") return [p];
  if (Array.isArray(o)) {
    return o.flatMap((v, i) => keys(v, `${p}.${i}`));
  }
  return Object.entries(o).flatMap(([k, v]) => keys(v, p ? `${p}.${k}` : k));
};

describe("legal dictionaries", () => {
  it("sq and en share identical key shape", () => {
    expect(keys(sq).sort()).toEqual(keys(en).sort());
  });
});
