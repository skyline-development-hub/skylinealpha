/**
 * Convert \n in dictionary strings to <br> for display headings.
 * Only used with static dictionary content — never user input.
 */
export function titleHtml(text: string): string {
  return text.replace(/\n/g, "<br>");
}
