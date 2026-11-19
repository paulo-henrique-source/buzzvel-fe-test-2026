import type { ComponentProps } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-brand text-white hover:bg-brand-hover',
  secondary: 'border-line bg-white text-ink hover:border-brand hover:bg-secondary-hover',
  accent: 'border-transparent bg-accent text-ink hover:bg-accent-hover',
};

export const textLinkClassName =
  'text-link inline-flex min-h-11 items-center gap-3 text-sm/[20px] font-bold text-left hover:underline hover:underline-offset-4 [&_svg]:shrink-0 [&_svg]:transition-[transform] [&_svg]:duration-[180ms] [&_svg]:ease-[ease] [&:hover_svg]:[transform:translateX(3px)]';

export const iconButtonClassName =
  'icon-button inline-flex size-11 items-center justify-center rounded-lg hover:bg-lavender';

export function buttonClassName(variant: ButtonVariant = 'primary', className = '') {
  return `button button--${variant} inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg border px-7 py-3.5 text-center text-sm/[22px] font-bold no-underline transition-[background-color,border-color,transform] duration-[180ms] ease-[ease] [&:active:not(:disabled)]:[transform:translateY(1px)] ${variantClasses[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<'a'> & { variant?: ButtonVariant };

export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return <a className={buttonClassName(variant, className)} {...props} />;
}
