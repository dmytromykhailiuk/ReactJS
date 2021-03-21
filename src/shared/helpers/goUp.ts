export function goUp(): void {
  let timeOut: NodeJS.Timeout;
  let position: number;
  let animation: boolean = false;
  const goUp1 = () => {
    var top = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    );
    if (top > 0) {
      if (animation === false) {
        animation = true;
        position = window.pageYOffset;
      }
      if (position * 0.7 <= window.pageYOffset) {
        window.scrollBy(0, (-100 * position) / 1000);
      } else if (position * 0.4 <= window.pageYOffset) {
        window.scrollBy(0, (-75 * position) / 1000);
      } else if (position * 0.25 <= window.pageYOffset) {
        window.scrollBy(0, (-50 * position) / 1000);
      } else if (position * 0.1 <= window.pageYOffset) {
        window.scrollBy(0, (-30 * position) / 1000);
      } else {
        window.scrollBy(0, (-20 * position) / 1000);
      }
      timeOut = setTimeout(() => goUp1(), 20);
    } else {
      clearTimeout(timeOut);
      animation = false;
    }
  };
  return goUp1();
}
