import { GoUpButton } from "./";
import { useShowGoUpButton } from "../../hooks";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

jest.mock("../../hooks");

describe("GoUpButton", () => {
  it("should match first snapshot", () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(false);
    const wrapper = shallow(<GoUpButton />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should match second snapshot", () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(true);
    const wrapper = shallow(<GoUpButton />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should call useShowGoUpButton function", () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(true);
    shallow(<GoUpButton />);
    expect(useShowGoUpButton).toHaveBeenCalled();
  })
})
