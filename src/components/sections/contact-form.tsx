'use client';

import { useId, useState, useSyncExternalStore, type SubmitEvent } from 'react';
import {
  contactFields,
  getContactValues,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactField,
} from '@/src/lib/contact';
import { buttonClassName } from '@/src/components/ui/button-link';

enum SubmissionState {
  Idle = 'idle',
  Submitting = 'submitting',
  Success = 'success',
  Error = 'error',
}

const inputClassName =
  'w-full min-w-0 rounded-lg border border-line bg-surface px-4 py-3 text-[16px] leading-[22px] text-ink placeholder:text-muted placeholder:opacity-100 aria-[invalid=true]:border-error-border lg:text-[14px]';
const feedbackClassName = 'form-feedback mt-5 rounded-lg px-4 py-3 text-[14px] leading-[22px]';

const subscribeToHydration = () => () => undefined;

export function ContactForm() {
  const id = useId();
  // Keep the server-rendered controls disabled until the submit handler is attached.
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmissionState>(SubmissionState.Idle);

  function clearError(field: ContactField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === SubmissionState.Success || status === SubmissionState.Error) {
      setStatus(SubmissionState.Idle);
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === SubmissionState.Submitting) return;
    const form = event.currentTarget;
    const values = getContactValues(new FormData(form));
    const validation = validateContact(values);
    setErrors(validation);

    const invalidField = contactFields.find((field) => validation[field]);
    if (invalidField) {
      setStatus(SubmissionState.Idle);
      const element = form.elements.namedItem(invalidField);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setStatus(SubmissionState.Submitting);
    try {
      await submitContact(values);
      form.reset();
      setStatus(SubmissionState.Success);
    } catch {
      setStatus(SubmissionState.Error);
    }
  }

  return (
    <div className="contact-form-card min-w-0 rounded-2xl px-5 py-6 shadow-contact lg:p-10 [@media(max-width:359px)]:px-4">
      <h3 className="contact-form-title font-heading text-[20px] leading-8 font-bold">
        Contact us
      </h3>
      <p className="contact-form-description mt-2 text-[14px] leading-6 text-muted">
        Fill out the fields and we will get in touch.
      </p>
      <form
        className="contact-form mt-6"
        method="post"
        noValidate
        onSubmit={handleSubmit}
        aria-busy={status === SubmissionState.Submitting}
        aria-label="Contact us"
      >
        <fieldset
          className="grid min-w-0 gap-6"
          disabled={!isHydrated || status === SubmissionState.Submitting}
        >
          <legend className="sr-only">Your contact details and question</legend>
          <div className="form-fields grid min-w-0 gap-5">
            <div className="form-field grid gap-2">
              <label htmlFor={`${id}-name`} className="text-[14px] leading-6 font-bold">
                Full name
              </label>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                className={`${inputClassName} min-h-12`}
                placeholder="Your name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${id}-name-error` : undefined}
                onChange={() => clearError('name')}
              />
              {errors.name && (
                <p id={`${id}-name-error`} className="field-error text-[13px] leading-5 text-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field grid gap-2">
              <label htmlFor={`${id}-email`} className="text-[14px] leading-6 font-bold">
                Email
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                className={`${inputClassName} min-h-12`}
                inputMode="email"
                placeholder="youremail@example.com"
                autoComplete="email"
                required
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${id}-email-error` : undefined}
                onChange={() => clearError('email')}
              />
              {errors.email && (
                <p
                  id={`${id}-email-error`}
                  className="field-error text-[13px] leading-5 text-error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-field grid gap-2">
              <label htmlFor={`${id}-message`} className="text-[14px] leading-6 font-bold">
                Your question
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                className={`${inputClassName} h-[100px] min-h-[100px] resize-y lg:h-[120px] lg:min-h-[120px]`}
                placeholder="Tell us how we can help..."
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
                onChange={() => clearError('message')}
              />
              {errors.message && (
                <p
                  id={`${id}-message-error`}
                  className="field-error text-[13px] leading-5 text-error"
                >
                  {errors.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={buttonClassName('primary', 'w-full')}>
            {status === SubmissionState.Submitting ? 'Sending message…' : 'Send message'}
          </button>
        </fieldset>
        <div role="status" aria-atomic="true">
          {status === SubmissionState.Success && (
            <p
              className={`${feedbackClassName} form-feedback--success bg-success-surface text-success`}
            >
              Demo complete. Your message was validated successfully; no email was sent.
            </p>
          )}
          {status === SubmissionState.Error && (
            <p className={`${feedbackClassName} form-feedback--error bg-error-surface text-error`}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
      {!isHydrated && (
        <p className="mt-4 text-sm">
          Please enable JavaScript to use this form, or email{' '}
          <a href="mailto:contact@luma.com" className="underline">
            contact@luma.com
          </a>
          .
        </p>
      )}
    </div>
  );
}
