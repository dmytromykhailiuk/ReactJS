import React from "react";
import { shallow } from "enzyme";
import Component from "./Component";

describe("Component", () => {
  it('should render blank "Hello World"', () => {
    const wrapper = shallow(<Component message={"Hello World"} />);
    const h2 = wrapper.find("h2").text();
    expect(h2).toBe("Hello World");
  });
})
