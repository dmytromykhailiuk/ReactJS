import { shallow } from "enzyme";
import React from "react";
import { SearchIcon } from "./";
import toJson from 'enzyme-to-json';

describe("SearchIcon", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(<SearchIcon />);
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })
})
