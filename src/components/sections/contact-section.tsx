import { Container } from '@/src/components/ui/container';
import { ClockIcon, MessageIcon } from '@/src/components/ui/icons';
import { SectionHeading } from '@/src/components/ui/section-heading';
import { ContactForm } from './contact-form';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section section-spacing py-[60px] lg:py-[100px]"
      aria-labelledby="contact-title"
    >
      <Container className="contact-grid grid items-center gap-10 [--container-max-width:720px] lg:grid-cols-[0.889fr_1fr] lg:gap-[100px] lg:[--container-max-width:var(--content-max-width)]">
        <div className="contact-copy [&_.section-description]:text-[14px] [&_.section-description]:leading-6 lg:[&_.section-description]:text-[18px] lg:[&_.section-description]:leading-7">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Get in touch"
            description="Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you."
          />
          <div className="contact-details mt-8 grid gap-4 lg:mt-10">
            <div className="contact-detail flex items-center gap-4 rounded-xl bg-surface p-4 text-[14px] leading-6 lg:p-5 [@media(max-width:359px)]:gap-3 [@media(max-width:359px)]:px-3 [@media(max-width:359px)]:text-[13px]">
              <span className="contact-icon flex size-10 shrink-0 items-center justify-center rounded-lg bg-lavender text-brand">
                <MessageIcon />
              </span>
              <dl>
                <dt className="text-ink">Email</dt>
                <dd className="mt-[2px] text-muted lg:mt-1">
                  <a
                    href="mailto:contact@luma.com"
                    className="text-brand underline-offset-4 hover:underline"
                  >
                    contact@luma.com
                  </a>
                </dd>
              </dl>
            </div>
            <div className="contact-detail flex items-center gap-4 rounded-xl bg-surface p-4 text-[14px] leading-6 lg:p-5 [@media(max-width:359px)]:gap-3 [@media(max-width:359px)]:px-3 [@media(max-width:359px)]:text-[13px]">
              <span className="contact-icon flex size-10 shrink-0 items-center justify-center rounded-lg bg-lavender text-brand">
                <ClockIcon />
              </span>
              <dl>
                <dt className="text-ink">Response Time</dt>
                <dd className="mt-[2px] text-muted lg:mt-1">Up to 24 hours on business days</dd>
              </dl>
            </div>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
