import { useEffect } from 'react';

interface ShortcutHandlers {
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleAnswer?: () => void;
}

export function useKeyboardShortcuts(
  handlers: ShortcutHandlers,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        handlers.onNext?.();
      }

      if (event.key === 'ArrowLeft') {
        handlers.onPrevious?.();
      }

      if (event.key === ' ') {
        event.preventDefault();
        handlers.onToggleAnswer?.();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers, enabled]);
}
