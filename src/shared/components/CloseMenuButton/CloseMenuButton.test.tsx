import { shallow } from "enzyme";
import React from "react";
import { CloseMenuButton } from "./";
import toJson from 'enzyme-to-json';

describe("CheckboxIcon", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(<CloseMenuButton />)
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })

  it("should match second snepshot", () => {
    const wrapper = shallow(<CloseMenuButton isSmall onCloseButtonClicked={() => {}} />)
    expect(toJson(wrapper)).toMatchSnapshot("second");
  })

  it("should call onClick when click on button", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <CloseMenuButton 
        onCloseButtonClicked={onClick}
      >
        Button
      </CloseMenuButton>
    );
    wrapper.find("div div").simulate('click');

    expect(onClick).toHaveBeenCalled();
  })
})