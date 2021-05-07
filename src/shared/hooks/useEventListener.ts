import { useEffect } from 'react';
import { EventTypes } from '../enums/event-types';

export function useEventListener(event: EventTypes, fn: (e: any) => void, deps: any[], shouldUse = true): void {
  useEffect(() => {
    if (shouldUse) {
      document.addEventListener(event, fn);
      return () => {
        document.removeEventListener(event, fn);
      };
    }
  }, deps);
}
