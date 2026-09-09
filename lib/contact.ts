export type ContactDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export const contactEmail = "itsadityabaniya@gmail.com";
export function buildEmailDraft(draft: ContactDraft): string {
  const subject = draft.subject.replace(/[\r\n]+/g, " ").trim();
  const body = `Hi Aaditya,\n\n${draft.message.trim()}\n\n${draft.name.trim()}\n${draft.email.trim()}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
