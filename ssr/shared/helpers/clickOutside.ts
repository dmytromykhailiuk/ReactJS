export function clickOutside(className: string, fn: () => void) {
  function compare(target: HTMLElement) {
    if (!target || target.tagName === 'BODY') {
      fn();
      return;
    }
    if (target.classList.contains(className)) {
      return;
    }
    compare(target.parentElement);
  }
  return (event: MouseEvent) => {
    compare(event.target as HTMLElement);
  };
}
