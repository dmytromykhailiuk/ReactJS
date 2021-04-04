import { useCallback, useState } from "react";
import { useEventListener } from "./useEventListener";
import { EventTypes } from "../enums";
import { getPageYOffsetValue } from "../helpers";

export function useShowGoUpButton(): boolean {
  const [showGoUpButton, setShowGoUpButtonValue] = useState<boolean>(false);

  const setShowGoUpButton = useCallback(() => {
    const pageYOffset = getPageYOffsetValue();
    if (!showGoUpButton && pageYOffset > 200) {
      setShowGoUpButtonValue(true);
    } else if (showGoUpButton && pageYOffset < 100) {
      setShowGoUpButtonValue(false);
    }
  }, [showGoUpButton]);

  useEventListener(EventTypes.SCROLL, setShowGoUpButton, [showGoUpButton]);

  return showGoUpButton;
}
