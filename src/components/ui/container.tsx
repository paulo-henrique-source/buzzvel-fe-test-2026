import type { ComponentProps } from 'react';

export function Container({ className = '', ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={`site-container mx-auto w-[calc(100%_-_var(--page-gutter)*2)] max-w-[var(--container-max-width,var(--content-max-width))] ${className}`}
      {...props}
    />
  );
}
