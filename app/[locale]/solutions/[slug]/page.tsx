import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/config";
import { titleHtml } from "@/lib/titleHtml";
import { ArrowRight } from "@/components/icons/ArrowIcon";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const validSlugs = ["ocr-api", "compliance-api", "ai-infrastructure"] as const;
type Slug = (typeof validSlugs)[number];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    validSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const solution = dict.solutions?.[slug as Slug];
  if (!solution) return {};
  return {
    title: solution.tag,
    description: solution.body,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);

  const solution = dict.solutions?.[slug as Slug];
  if (!solution) notFound();

  const titleMarkup = { __html: titleHtml(solution.title) };
  const schemaMarkup = {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: solution.tag,
      description: solution.body,
      provider: {
        "@type": "Organization",
        name: "Skyline DevHub",
        url: "https://skylinedevelopmenthub.com",
      },
    }),
  };

  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <Link href={`/${locale}`}>&larr; {dict.footer.backToSite}</Link>
      </nav>
      <div className="legal-content">
        <div className="tag">{solution.tag}</div>
        <h1 dangerouslySetInnerHTML={titleMarkup} />
        <p className="body-text">{solution.body}</p>
        <div className="project-list" style={{ marginBlockStart: "2rem" }}>
          {solution.features.map(
            (f: { name: string; desc: string }, i: number) => (
              <div key={i} className="project-item">
                <span className="project-name">{f.name}</span>
                <span className="project-type">{f.desc}</span>
              </div>
            )
          )}
        </div>
        <button
          data-chatbot-build
          type="button"
          className="cta"
          style={{ marginBlockStart: "2.5rem" }}
        >
          {solution.cta}
          <ArrowRight />
        </button>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaMarkup}
      />
    </div>
  );
}
