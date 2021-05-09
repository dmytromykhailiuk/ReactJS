import { useMemo } from 'react';
import { clickOutside } from '../helpers';
import { EventTypes } from '../enums';
import { useEventListener } from './useEventListener';

export function useClickOutside(className: string, callback: () => void, shouldUse = true) {
  const clickOutsides = useMemo(() => clickOutside(className, callback), []);

  useEventListener(EventTypes.CLICK, clickOutsides, [shouldUse], shouldUse);
}
