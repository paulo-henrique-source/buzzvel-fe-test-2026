'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/src/data/page-content';
import { ButtonLink, iconButtonClassName } from '@/src/components/ui/button-link';
import { CloseIcon, MenuIcon } from '@/src/components/ui/icons';

const desktopMediaQuery = '(min-width: 1024px)';

export function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(desktopMediaQuery);
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        dialogRef.current?.close();
        setIsOpen(false);
      }
    }

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open && !window.matchMedia(desktopMediaQuery).matches) {
      dialog.showModal();
    }
  }, [isOpen]);

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <div className="mobile-navigation -mr-1 lg:hidden">
      <button
        type="button"
        className={iconButtonClassName}
        aria-label="Open navigation menu"
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </button>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu fixed inset-0 left-auto m-0 h-dvh max-h-dvh w-[min(100%,400px)] max-w-full border-0 bg-surface p-0 text-ink"
        aria-label="Navigation menu"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (
            event.target === event.currentTarget &&
            event.clientX < event.currentTarget.getBoundingClientRect().left
          )
            closeMenu();
        }}
      >
        {isOpen && (
          <div className="mobile-menu-content flex min-h-full flex-col px-6 pt-5 pb-8">
            <div className="flex items-center justify-between">
              <a
                href="#home"
                className="brand inline-block text-[24px]/[1.2] font-bold tracking-[-1.3px]"
                aria-label="Luma home"
                onClick={closeMenu}
              >
                luma.
              </a>
              <button
                type="button"
                className={iconButtonClassName}
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mt-14 grid gap-7">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-1 font-heading text-2xl font-semibold hover:text-brand"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 pt-12">
              <ButtonLink href="#contact" variant="secondary" onClick={closeMenu}>
                Log in
              </ButtonLink>
              <ButtonLink href="#courses" onClick={closeMenu}>
                Start learning
              </ButtonLink>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
