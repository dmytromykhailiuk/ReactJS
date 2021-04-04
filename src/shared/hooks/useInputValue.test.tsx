import { mount } from "enzyme";
import React from "react";
import { useInputValue } from "./useInputValue";

const TestComponent: React.FC = () => {
  const {
    value,
    onChangeValue,
  } = useInputValue('initialValue');

  return (
    <>
      <div className={value} />
      <button onClick={() => onChangeValue({ target: { value: '121' } })} >Set Error</button>
    </>
  )
}

describe("useDefaultImage", () => {
  it("should change className on 121 after click on button", () => {
    const wrapper = mount(<TestComponent />);
    wrapper.find('button').simulate('click');
    expect(wrapper.exists('.initialValue')).toBeFalsy();
  })
})
