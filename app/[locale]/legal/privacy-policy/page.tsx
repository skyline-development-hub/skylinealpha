import type { Metadata } from "next";
import { getLegalDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { LegalSections, type LegalPage } from "@/components/legal/LegalSections";

export const metadata: Metadata = {
  title: "Privacy Policy — Skyline DevHub",
};

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getLegalDictionary(locale as Locale);
  const page = dict.privacyPolicy as unknown as LegalPage;

  return (
    <>
      <h1>{page.title}</h1>
      <p className="legal-updated">{page.updated}</p>
      <LegalSections sections={page.sections} />
    </>
  );
}
