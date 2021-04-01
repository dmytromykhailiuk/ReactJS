import { Logo } from "./";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

describe("Logo", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Logo />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
