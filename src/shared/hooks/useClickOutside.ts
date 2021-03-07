import { useEffect, useMemo } from "react";
import { clickOutside } from "shared/helpers";

export function useClickOutside(
  className: string,
  callback: () => void,
  shouldUse: boolean = true
) {
  const clickOutsides = useMemo(() => clickOutside(className, callback), []);

  useEffect(() => {
    if (shouldUse) {
      document.addEventListener("click", clickOutsides);
      return () => {
        document.removeEventListener("click", clickOutsides);
      };
    }
  }, [shouldUse]);
}
