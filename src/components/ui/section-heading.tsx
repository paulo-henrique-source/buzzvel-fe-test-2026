import type { ReactNode } from 'react';

export const eyebrowClassName =
  'eyebrow text-brand text-xs/[16px] font-semibold tracking-[1.2px] uppercase';

export const sectionTitleClassName =
  'section-title mt-4 font-heading text-[32px]/[36px] font-extrabold tracking-[-0.8px] lg:text-[48px]/[56px] lg:tracking-[-1.2px]';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`}>
      <p className={eyebrowClassName}>{eyebrow}</p>
      <h2 id={id} className={sectionTitleClassName}>
        {title}
      </h2>
      {description && (
        <p className="section-description mt-4 text-base/[26px] text-muted lg:text-lg/[28px]">
          {description}
        </p>
      )}
    </div>
  );
}
