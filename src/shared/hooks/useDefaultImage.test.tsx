import { mount } from "enzyme";
import React from "react";
import { useDefaultImage } from "./useDefaultImage";

const TestComponent: React.FC = () => {
  const [defaultImage, setError] = useDefaultImage('imageUrl');

  return (
    <>
      <div className={defaultImage} />
      <button onClick={setError} >Set Error</button>
    </>
  )
}

describe("useDefaultImage", () => {
  it("should change className on defaultUrl after click on button", () => {
    const wrapper = mount(<TestComponent />);
    wrapper.find('button').simulate('click');
    expect(wrapper.exists('.imageUrl')).toBeFalsy();
  })
})
