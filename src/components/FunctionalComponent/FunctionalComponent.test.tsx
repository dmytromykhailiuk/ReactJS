import React from "react";
import { shallow } from "enzyme";
import FunctionalComponent from "./FunctionalComponent";

describe("FunctionalComponent", () => {
  it('should render blank "Hello World"', () => {
    const wrapper = shallow(<FunctionalComponent message={"Hello World"} />);
    const h2 = wrapper.find("h2").text();
    expect(h2).toBe("Hello World");
  });
});
