import { EventTypes } from "../enums/event-types";
import { useEffect } from "react";

export function useEventListener(
  event: EventTypes,
  fn: (e: any) => void,
  deps: any[],
  shouldUse: boolean = true
): void {
  useEffect(() => {
    if (shouldUse) {
      document.addEventListener(event, fn);
      return () => {
        document.removeEventListener(event, fn);
      };
    }
  }, deps);
}
