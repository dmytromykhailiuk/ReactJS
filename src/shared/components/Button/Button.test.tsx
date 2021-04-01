import { shallow } from "enzyme";
import { Button } from "./";
import React from "react";
import { ButtonTypes, ButtonSize } from "../../enums";
import toJson from 'enzyme-to-json';

describe("Button", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(<Button>Button</Button>)
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })

  it("should match second snepshot", () => {
    const wrapper = shallow(
      <Button 
        type={ButtonTypes.SECONDARY}
        size={ButtonSize.SMALL}
        isSubmit
      >Button</Button>)
    expect(toJson(wrapper)).toMatchSnapshot("second");
  })

  it("should call onClick when click on button", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Button 
        onButtonClicked={onClick}
      >Button</Button>)
    wrapper.find("button").simulate('click');

    expect(onClick).toHaveBeenCalled();
  })
})
