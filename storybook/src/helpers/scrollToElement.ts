export function scrollToElement(element: HTMLElement) {
  Promise.resolve().then(() => {
    element.scrollIntoView();
  });
}
