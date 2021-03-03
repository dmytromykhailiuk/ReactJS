export function clickOutside(className: string, fn: () => void) {
  function compere(target: HTMLElement) {
    if (!target || target.tagName === "BODY") {
      fn();
      return;
    }
    if (target.classList.contains(className)) {
      return;
    }
    compere(target.parentElement);
  }
  return (event: MouseEvent) => {
    compere(event.target as HTMLElement);
  };
}
