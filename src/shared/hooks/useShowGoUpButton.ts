import { useCallback, useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";
import { EventTypes } from "shared/enums";

export function useShowGoUpButton(): boolean {
  const [showGoUpButton, setShowGoUpButtonValue] = useState<boolean>(false);

  const setShowGoUpButton = useCallback(() => {
    if (!showGoUpButton && window.pageYOffset > 200) {
      setShowGoUpButtonValue(true);
    } else if (showGoUpButton && window.pageYOffset < 100) {
      setShowGoUpButtonValue(false);
    }
  }, [showGoUpButton]);

  useEventListener(EventTypes.SCROLL, setShowGoUpButton, [showGoUpButton]);

  return showGoUpButton;
}
