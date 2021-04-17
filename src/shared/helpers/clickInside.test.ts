import { isClickInside } from "./clickInside";

describe("isClickInside", () => {
  it("it should return 'true' when target equal currentTarget", () => {
    const obj = {};
    const event = {
      target: obj,
      currentTarget: obj,
    } as any;
    expect(isClickInside(event)).toBeTruthy();
  });

  it("it should return 'false' when target not equal currentTarget and has a class", () => {
    const obj = {};
    const target = document.createElement("div");
    const className = "className";
    target.classList.add(className);
    const event = {
      target,
      currentTarget: obj,
    } as any;
    expect(isClickInside(event, className)).toBeFalsy();
  });

  it("it should return 'true' when target parent equal 'currentTarget'", () => {
    const currentTarget = document.createElement("span");
    const target = document.createElement("div");
    currentTarget.append(target);
    const event = {
      target,
      currentTarget,
    } as any;
    expect(isClickInside(event)).toBeTruthy();
  });
});
