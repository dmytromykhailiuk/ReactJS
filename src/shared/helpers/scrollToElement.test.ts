import { scrollToElement } from "./";

describe("scrollToElement", () => {
  it("should call 'element.scrollIntoView'", () => {
    const element = {
      scrollIntoView: jest.fn(),
    } as any;
    scrollToElement(element);
    setTimeout(() => {
      expect(element.scrollIntoView).toHaveBeenCalled();
    });
  });
});
