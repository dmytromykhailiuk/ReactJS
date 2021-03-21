import { SyntheticEvent } from "react";

export function isClickInside(
  event: SyntheticEvent,
  ...classes: string[]
): boolean {
  const { target, currentTarget } = event;

  function isInside(target: EventTarget & HTMLElement): boolean {
    if (target === currentTarget) {
      return true;
    }
    if (classes.some((className) => target.classList.contains(className))) {
      return false;
    }
    return isInside(target.parentElement);
  }
  return isInside(target as HTMLElement);
}
