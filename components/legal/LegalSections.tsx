/**
 * Shared renderer for legal page sections. Reads the block-based schema
 * from i18n/dictionaries/legal/{sq,en}.json.
 *
 * Block types:
 *   - p   — paragraph; optional `strong` renders the whole text bold
 *   - h3  — subsection heading
 *   - ul  — unordered list; items are strings OR { label, text } pairs,
 *           where the label becomes a bold prefix followed by an em-dash
 */

export type LegalListItem = string | { label: string; text: string };

export type LegalBlock =
  | { type: "p"; text: string; strong?: boolean }
  | { type: "h3"; text: string }
  | { type: "ul"; items: LegalListItem[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPage = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={i}>
          <h2>{s.heading}</h2>
          {s.blocks.map((b, j) => {
            if (b.type === "h3") return <h3 key={j}>{b.text}</h3>;
            if (b.type === "p") {
              return b.strong ? (
                <p key={j}><strong>{b.text}</strong></p>
              ) : (
                <p key={j}>{b.text}</p>
              );
            }
            if (b.type === "ul") {
              return (
                <ul key={j}>
                  {b.items.map((it, k) =>
                    typeof it === "string" ? (
                      <li key={k}>{it}</li>
                    ) : (
                      <li key={k}>
                        <strong>{it.label}</strong> — {it.text}
                      </li>
                    ),
                  )}
                </ul>
              );
            }
            return null;
          })}
        </section>
      ))}
    </>
  );
}
