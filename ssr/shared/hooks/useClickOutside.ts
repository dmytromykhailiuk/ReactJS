import { useMemo } from 'react';
import { clickOutside } from '../helpers';
import { useEventListener } from './useEventListener';
import { EventTypes } from '../enums';

export function useClickOutside(className: string, callback: () => void, shouldUse = true) {
  const clickOutsides = useMemo(() => clickOutside(className, callback), []);

  useEventListener(EventTypes.CLICK, clickOutsides, [shouldUse], shouldUse);
}
