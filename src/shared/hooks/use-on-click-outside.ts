import { useEffect, type RefObject } from 'react';

export function useOnClickOutside<TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  handler: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: PointerEvent) {
      const element = ref.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler();
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, handler, enabled]);
}
