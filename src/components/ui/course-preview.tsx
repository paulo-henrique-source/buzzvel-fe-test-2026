'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  buttonClassName,
  iconButtonClassName,
  textLinkClassName,
  type ButtonVariant,
} from './button-link';
import { CourseDetails } from './course-details';
import { ArrowRightIcon, CloseIcon } from './icons';
import { eyebrowClassName } from './section-heading';

type CoursePreviewProps = {
  courseId: string;
  category: string;
  title: string;
  label?: string;
  variant?: ButtonVariant | 'text';
};

type DialogState = 'closed' | 'open' | 'closing';

export function CoursePreview({
  courseId,
  category,
  title,
  label = 'Explore',
  variant = 'text',
}: CoursePreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogState === 'open') {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialogState !== 'closing') return;

    let disposed = false;
    const frame = requestAnimationFrame(() => {
      // Read the exit animations after the closing state reaches the rendered styles.
      const animations = dialog.getAnimations();
      void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        if (!disposed && dialog.open) dialog.close();
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [dialogState]);

  function closePreview() {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialogState === 'closing') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }

    setDialogState('closing');
  }

  return (
    <>
      <button
        type="button"
        className={variant === 'text' ? textLinkClassName : buttonClassName(variant)}
        onClick={() => setDialogState('open')}
        aria-haspopup="dialog"
        aria-label={label === 'Explore' ? `Explore ${category}` : undefined}
      >
        {label}
        {variant === 'text' && <ArrowRightIcon />}
      </button>
      {dialogState !== 'closed' && (
        <dialog
          ref={dialogRef}
          className="course-dialog fixed inset-0 m-auto max-h-[calc(100dvh_-_40px)] w-[min(640px,calc(100%_-_32px))] max-w-none overflow-y-auto rounded-[20px] border border-line bg-white p-0 text-ink shadow-dialog"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-state={dialogState}
          onClose={() => setDialogState('closed')}
          onCancel={(event) => {
            event.preventDefault();
            closePreview();
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            ) {
              closePreview();
            }
          }}
        >
          <div className="course-dialog-content relative px-6 py-9 sm:px-10 sm:py-12">
            <button
              type="button"
              className={`${iconButtonClassName} dialog-close absolute top-3 right-3`}
              aria-label="Close course preview"
              onClick={closePreview}
            >
              <CloseIcon />
            </button>
            <p className={`${eyebrowClassName} pr-8`}>{category} · Course preview</p>
            <h2
              id={titleId}
              className="dialog-title mt-6 mb-5 font-heading text-[28px]/[36px] font-bold tracking-[-1px]"
            >
              {title}
            </h2>
            <CourseDetails
              courseId={courseId}
              descriptionId={descriptionId}
              onEnroll={() => dialogRef.current?.close()}
            />
          </div>
        </dialog>
      )}
    </>
  );
}
