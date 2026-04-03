import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <Link href={`/${locale}`}>&larr; {dict.footer.backToSite}</Link>
      </nav>
      <div className="legal-content">{children}</div>
    </div>
  );
}
