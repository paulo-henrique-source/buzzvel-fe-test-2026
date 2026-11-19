'use client';

import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/src/data/page-content';
import { ButtonLink, iconButtonClassName } from '@/src/components/ui/button-link';
import { CloseIcon, MenuIcon } from '@/src/components/ui/icons';

const desktopMediaQuery = '(min-width: 1024px)';
type MenuState = 'closed' | 'open' | 'closing';

export function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const isOpen = menuState !== 'closed';

  useEffect(() => {
    const desktop = window.matchMedia(desktopMediaQuery);
    const dialog = dialogRef.current;
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        dialog?.close();
        setMenuState('closed');
      }
    }

    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      dialog?.close();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuState === 'open') {
      if (!dialog.open && !window.matchMedia(desktopMediaQuery).matches) dialog.showModal();
      return;
    }

    if (menuState !== 'closing') return;

    let disposed = false;
    const frame = requestAnimationFrame(() => {
      const animations = dialog
        .getAnimations()
        .filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().endTime));
      void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        if (!disposed && dialog.open) dialog.close();
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [menuState]);

  function closeImmediately() {
    dialogRef.current?.close();
    setMenuState('closed');
  }

  function closeMenu() {
    if (!dialogRef.current?.open || menuState === 'closing') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      closeImmediately();
      return;
    }

    setMenuState('closing');
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
        onClick={() => setMenuState('open')}
      >
        <MenuIcon />
      </button>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu fixed inset-0 left-auto m-0 h-dvh max-h-dvh w-[min(100%,400px)] max-w-full border-0 bg-surface p-0 text-ink"
        aria-label="Navigation menu"
        data-state={menuState}
        onClose={() => setMenuState('closed')}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
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
                onClick={closeImmediately}
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
                  onClick={closeImmediately}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 pt-12">
              <ButtonLink href="#contact" variant="secondary" onClick={closeImmediately}>
                Log in
              </ButtonLink>
              <ButtonLink href="#courses" onClick={closeImmediately}>
                Start learning
              </ButtonLink>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
