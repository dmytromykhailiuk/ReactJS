import { shallow } from "enzyme";
import React from "react";
import { CheckboxIcon } from "./";
import toJson from 'enzyme-to-json';

describe("CheckboxIcon", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(<CheckboxIcon />)
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })

  it("should match second snepshot", () => {
    const wrapper = shallow(<CheckboxIcon isLarge />)
    expect(toJson(wrapper)).toMatchSnapshot("second");
  })
})
