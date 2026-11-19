import { navigation } from '@/src/data/page-content';
import { Container } from '@/src/components/ui/container';
import { ButtonLink } from '@/src/components/ui/button-link';
import { MobileNavigation } from './mobile-navigation';

export function SiteHeader() {
  return (
    <header
      id="home"
      className="site-header h-[69px] border-b border-line bg-surface lg:h-[70px] lg:border-b-transparent"
    >
      <Container className="header-content relative flex h-full items-center justify-between">
        <a
          href="#home"
          className="brand inline-block text-[24px]/[1.2] font-bold tracking-[-1.3px]"
          aria-label="Luma home"
        >
          luma.
        </a>
        <nav
          aria-label="Main navigation"
          className="desktop-navigation hidden text-sm/[20px] text-muted lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:items-center lg:gap-8"
        >
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-brand">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions hidden text-[14px] lg:flex lg:items-center lg:gap-6 [&_.button]:min-h-11 [&_.button]:px-5 [&_.button]:py-2.5">
          <a href="#contact" className="login-link text-muted hover:text-brand">
            Log in
          </a>
          <ButtonLink href="#courses">Start learning</ButtonLink>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
