import { shallow } from "enzyme";
import React from "react";
import { ThreeDotsIcon } from "./";
import toJson from 'enzyme-to-json';

describe("ThreeDotsIcon", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(<ThreeDotsIcon />);
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })
})
