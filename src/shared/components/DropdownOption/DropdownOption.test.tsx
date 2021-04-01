import { DropdownOption } from "./";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

describe("DropdownOption", () => {
  it("should match first snapshot", () => {
    const wrapper = shallow(<DropdownOption />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should match second snapshot", () => {
    const wrapper = shallow(<DropdownOption isSelected />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
