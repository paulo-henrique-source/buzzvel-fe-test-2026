export const contactFields = ['name', 'email', 'message'] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function getContactValues(data: FormData): ContactValues {
  return {
    name: String(data.get('name') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    message: String(data.get('message') ?? '').trim(),
  };
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2)
    errors.name = 'Please enter your name (at least 2 characters).';
  else if (values.name.length > 100) errors.name = 'Please use 100 characters or fewer.';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.message.trim().length < 10)
    errors.message = 'Please tell us a little more (at least 10 characters).';
  else if (values.message.length > 2000) errors.message = 'Please use 2,000 characters or fewer.';
  return errors;
}

/** Local-only simulation: messages are never stored, logged or emailed. */
export async function submitContact(values: ContactValues): Promise<void> {
  if (Object.keys(validateContact(values)).length > 0) throw new Error('Invalid contact details.');
  await new Promise<void>((resolve) => setTimeout(resolve, 600));
}
