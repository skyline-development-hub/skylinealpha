import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import enDict from "@/i18n/dictionaries/en.json";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders service, company size, budget, email, and message fields", () => {
    render(<ContactForm dict={enDict.contactForm} />);
    expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<ContactForm dict={enDict.contactForm} />);
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeInTheDocument();
  });

  it("renders service dropdown with 4 options plus empty default", () => {
    render(<ContactForm dict={enDict.contactForm} />);
    const select = screen.getByLabelText(/service interest/i) as HTMLSelectElement;
    expect(select.options.length).toBe(5);
  });
});
