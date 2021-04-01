import { ModalWrapper } from "./";
import { shallow, mount } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import ReactDOM from "react-dom";

jest.mock("react-dom");
(ReactDOM.createPortal as jest.Mock).mockImplementation((arg) => arg);

describe("ModalWrapper", () => {
  beforeEach(() => {
    global.document = {
      getElementById: jest.fn().mockReturnValue({} as any),
      body: {
        style: {
          overflow: "visible",
        }
      }
    } as any;
  })

  it("should match first snapshot", () => {
    const wrapper = shallow(<ModalWrapper onCloseModal={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should match second snapshot", () => { 
    const wrapper = shallow(<ModalWrapper header={"Modal"} onCloseModal={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should style be hidden after component mounting", () => { 
    mount(<ModalWrapper onCloseModal={() => {}} />);
    expect(document.body.style.overflow).toEqual("hidden");
  })

  it("should style be hidden after component unmounting", () => { 
    const wrapper = mount(<ModalWrapper onCloseModal={() => {}} />);
    wrapper.unmount();
    expect(document.body.style.overflow).toEqual("visible");
  })
})
