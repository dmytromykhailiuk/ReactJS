import { mount } from "enzyme";
import React from "react";
import { useEventListener } from "./useEventListener";
import { EventTypes } from "../enums/event-types";

const addEventListener = jest.spyOn(global.document, "addEventListener");
const removeEventListener = jest.spyOn(global.document, "removeEventListener");

const TestComponent: React.FC = () => {
  useEventListener(EventTypes.CLICK, () => {}, []);

  return (
    <div />
  )
}

describe("useEventListener", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should should call addEventListener", () => {
    mount(<TestComponent />);
    expect(addEventListener).toHaveBeenCalled();
  })

  it("should should call removeEventListener", () => {
    const wrapper = mount(<TestComponent />);
    wrapper.unmount();
    expect(removeEventListener).toHaveBeenCalled();
  })
})
