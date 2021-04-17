import { clickOutside } from "./clickOutside";

describe("clickOutside", () => {
  const fn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call 'fn' when target is falsy", () => {
    clickOutside(
      "bla-bla",
      fn
    )({
      target: null,
    } as any);
    expect(fn).toHaveBeenCalled();
  });

  it("should call 'fn' when target has tagName equal 'BODY'", () => {
    clickOutside(
      "bla-bla",
      fn
    )({
      target: {
        tagName: "BODY",
      },
    } as any);
    expect(fn).toHaveBeenCalled();
  });

  it("shouldn't call 'fn' when target has class equal class in clickOutside", () => {
    const target = document.createElement("div");
    target.classList.add("bla-bla");

    clickOutside("bla-bla", fn)({ target } as any);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("shouldn't call 'fn' when parent has class equal class in clickOutside", () => {
    const target = document.createElement("div");
    const parent = document.createElement("div");
    parent.classList.add("bla-bla");
    parent.append(target);

    clickOutside("bla-bla", fn)({ target } as any);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
