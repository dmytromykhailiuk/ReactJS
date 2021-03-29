import { useCallback, useEffect, useState } from "react";

export function useShowGoUpButton(): boolean {
  const [showGoUpButton, setShowGoUpButtonValue] = useState<boolean>(false);

  const setShowGoUpButton = useCallback(() => {
    if (!showGoUpButton && window.pageYOffset > 200) {
      setShowGoUpButtonValue(true);
    } else if (showGoUpButton && window.pageYOffset < 100) {
      setShowGoUpButtonValue(false);
    }
  }, [showGoUpButton]);

  useEffect(() => {
    document.addEventListener("scroll", setShowGoUpButton);
    return () => {
      document.removeEventListener("scroll", setShowGoUpButton);
    };
  }, [showGoUpButton]);

  return showGoUpButton;
}
