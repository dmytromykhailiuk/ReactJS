import { useEffect, useMemo } from "react";
import { clickOutside } from "shared/helpers";
import { useEventListener } from "./useEventListener";
import { EventTypes } from "shared/enums";

export function useClickOutside(
  className: string,
  callback: () => void,
  shouldUse: boolean = true
) {
  const clickOutsides = useMemo(() => clickOutside(className, callback), []);

  useEventListener(EventTypes.CLICK, clickOutsides, [shouldUse], shouldUse);
}
