import { footerGroups } from '@/src/data/page-content';
import { Container } from '@/src/components/ui/container';

export function SiteFooter() {
  return (
    <footer className="site-footer bg-ink pt-15 pb-5 text-white lg:pt-20 lg:pb-10 [&_:focus-visible]:outline-accent">
      <Container>
        <div className="footer-grid grid grid-cols-2 grid-rows-[auto_minmax(164px,auto)_auto] gap-10 lg:min-h-[166px] lg:grid-cols-[minmax(0,400fr)_repeat(3,minmax(0,192fr))] lg:grid-rows-[auto] lg:gap-12">
          <div className="footer-brand col-span-full lg:col-auto">
            <a
              href="#home"
              className="brand block w-fit text-[24px]/[17px] font-bold tracking-[-1.3px]"
              aria-label="Luma home"
            >
              luma.
            </a>
            <p className="mt-3 text-sm/[24px] text-footer-muted lg:max-w-60">
              Practical learning for curious people.
            </p>
          </div>
          {footerGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="last:col-span-full lg:last:col-auto"
            >
              <h2 className="footer-heading text-xs/[16px] font-semibold tracking-[1.2px] uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block text-sm/[21px] text-footer-muted hover:text-white hover:underline hover:underline-offset-4 lg:leading-6"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="footer-copyright mt-12 border-t border-footer-line pt-6 text-center text-sm/[20px] lg:mt-16 lg:text-left">
          © 2026 Luma Learning
        </p>
      </Container>
    </footer>
  );
}
