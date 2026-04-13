import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Bebas_Neue: () => ({ variable: "--font-display" }),
  DM_Mono: () => ({ variable: "--font-mono" }),
}));

vi.mock("../globals.css", () => ({}));

describe("Layout metadata", () => {
  it("includes OpenGraph and Twitter card metadata", async () => {
    const mod = await import("../layout");
    const { metadata } = mod;
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.siteName).toBe("Skyline DevHub");
    expect(metadata.openGraph.type).toBe("website");
    expect(metadata.openGraph.locale).toBe("sq_AL");
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter.card).toBe("summary_large_image");
    expect(metadata.metadataBase?.toString()).toBe("https://skylinedevelopmenthub.com/");
    expect(metadata.alternates?.languages).toHaveProperty("sq");
    expect(metadata.alternates?.languages).toHaveProperty("en");
  });
});
