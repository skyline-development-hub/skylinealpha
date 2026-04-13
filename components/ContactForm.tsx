"use client";

import { useState, type FormEvent } from "react";

export interface ContactFormDict {
  service: string;
  serviceOptions: string[];
  companySize: string;
  sizeOptions: string[];
  budget: string;
  budgetOptions: string[];
  email: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
}

export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flow: "contact-form",
          messages: [
            {
              role: "user",
              content: [
                `Service: ${form.get("service")}`,
                `Company size: ${form.get("companySize")}`,
                `Budget: ${form.get("budget")}`,
                `Email: ${form.get("email")}`,
                `Message: ${form.get("message") || "N/A"}`,
              ].join("\n"),
            },
          ],
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") return <p className="body-text">{dict.sent}</p>;

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="cf-service">{dict.service}</label>
        <select id="cf-service" name="service" required>
          <option value="">—</option>
          {dict.serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-size">{dict.companySize}</label>
        <select id="cf-size" name="companySize" required>
          <option value="">—</option>
          {dict.sizeOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-budget">{dict.budget}</label>
        <select id="cf-budget" name="budget" required>
          <option value="">—</option>
          {dict.budgetOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-email">{dict.email}</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="form-field">
        <label htmlFor="cf-message">{dict.message}</label>
        <textarea id="cf-message" name="message" rows={3} />
      </div>

      <button type="submit" className="cta" disabled={status === "sending"}>
        {status === "sending" ? dict.sending : dict.send}
      </button>
      {status === "error" && <p className="body-text">{dict.error}</p>}
    </form>
  );
}
