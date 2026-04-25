"use client";

import { useEffect, useState } from "react";

/**
 * Diagnostic overlay for "taps don't work on real device but DevTools is fine"
 * problems. Renders only when `?debug=touch` is present in the URL.
 *
 * Logs touchstart, touchend, and click events from document.body so we can
 * see — on the actual phone — whether the touch→click pipeline is firing
 * and where each event is hitting. Last 10 events shown.
 *
 * Remove the import in app/[locale]/layout.tsx once the issue is diagnosed.
 */

type LogEntry = { id: number; line: string };

export default function MobileTouchDebug() {
  const [enabled, setEnabled] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const enabled =
      new URLSearchParams(window.location.search).get("debug") === "touch";
    setEnabled(enabled);
    if (!enabled) return;

    let id = 0;
    const push = (line: string) => {
      setLog((prev) => [{ id: id++, line }, ...prev].slice(0, 12));
    };

    const describe = (target: EventTarget | null): string => {
      if (!(target instanceof Element)) return String(target);
      const tag = target.tagName.toLowerCase();
      const cls = (target.className || "").toString().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
      const txt = (target.textContent || "").trim().slice(0, 14);
      return [tag, cls && `.${cls}`, txt && `"${txt}"`].filter(Boolean).join(" ");
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      push(`▾ touchstart @ (${t?.clientX | 0},${t?.clientY | 0}) → ${describe(e.target)}`);
    };
    const onTouchEnd = (e: TouchEvent) => {
      push(`▴ touchend → ${describe(e.target)}`);
    };
    const onClick = (e: MouseEvent) => {
      push(`● click → ${describe(e.target)}`);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    document.addEventListener("click", onClick, { capture: true });

    push("debug: capturing touchstart / touchend / click on document");

    return () => {
      document.removeEventListener("touchstart", onTouchStart, { capture: true } as EventListenerOptions);
      document.removeEventListener("touchend", onTouchEnd, { capture: true } as EventListenerOptions);
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        right: 8,
        zIndex: 99999,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        padding: "6px 8px",
        fontFamily: "ui-monospace, monospace",
        fontSize: 10,
        lineHeight: 1.4,
        border: "1px solid #0f0",
        pointerEvents: "none",
        maxHeight: "40vh",
        overflow: "hidden",
      }}
    >
      {log.length === 0 ? (
        <div>tap a button to see events…</div>
      ) : (
        log.map((l) => <div key={l.id}>{l.line}</div>)
      )}
    </div>
  );
}
