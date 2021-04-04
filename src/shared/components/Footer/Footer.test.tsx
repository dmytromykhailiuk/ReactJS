import { Footer } from "./";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

describe("Footer", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
