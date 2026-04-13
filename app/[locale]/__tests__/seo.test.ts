import { describe, it, expect } from "vitest";

describe("robots.txt", () => {
  it("exports a robots config that allows crawling and blocks /api/", async () => {
    const mod = await import("@/app/robots");
    const robots = mod.default();
    expect(robots.rules).toEqual({ userAgent: "*", allow: "/", disallow: "/api/" });
    expect(robots.sitemap).toBe("https://skylinedevelopmenthub.com/sitemap.xml");
  });
});
