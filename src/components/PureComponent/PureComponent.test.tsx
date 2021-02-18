import React from "react";
import { shallow } from "enzyme";
import PureComponent from "./PureComponent";

describe("PureComponent", () => {
  it('should render blank "Hello World"', () => {
    const wrapper = shallow(<PureComponent message={"Hello World"} />);
    const h2 = wrapper.find("h2").text();
    expect(h2).toBe("Hello World");
  });
});
