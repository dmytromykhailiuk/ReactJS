import { DropdownOption } from "./";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

describe("DropdownOption", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<DropdownOption />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should has dropdown-option__checkbox--checked class when isSelected", () => {
    const wrapper = shallow(<DropdownOption isSelected />);
    expect(wrapper.exists('.dropdown-option__checkbox--checked')).toBeTruthy()
  })
})
