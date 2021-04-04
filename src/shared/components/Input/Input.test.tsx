import { Input } from "./";
import { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";

const event = {} as any;

describe("Input", () => {
  it("should match first snapshot", () => {
    const wrapper = shallow(
      <Input
        value={"1211"}
        name={"name"}
        type={"text"}
        placeholder={"write you name"}
        label={"label"}
        disabled={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should error error message when has error", () => {
    const wrapper = shallow(
      <Input
        error={"some error"}
      />
    );   
    expect(wrapper.exists(".input__error")).toBeTruthy()
  })

  it("should call onBlur function when blur event occurred", () => {
    const onBlur = jest.fn();
    const wrapper = shallow(
      <Input
        onBlur={onBlur}
      />
    );
    wrapper.find("input").simulate("focus").simulate("blur", event);
    expect(onBlur).toHaveBeenCalledWith(event)
  })

  it("should call onChange function when change event occurred", () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Input
        onChange={onChange}
      />
    );
    wrapper.find("input").simulate("change", event);
    expect(onChange).toHaveBeenCalledWith(event)
  })
})
