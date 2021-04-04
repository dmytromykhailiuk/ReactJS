import { ModalWrapper } from "./";
import { shallow, mount, ReactWrapper } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import ReactDOM from "react-dom";

jest.mock("react-dom");
(ReactDOM.createPortal as jest.Mock).mockImplementation((arg) => arg);

describe("ModalWrapper", () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    global.document = {
      getElementById: jest.fn().mockReturnValue({} as any),
      body: {
        style: {
          overflow: "visible",
        }
      }
    } as any;

    wrapper = mount(<ModalWrapper onCloseModal={() => {}} />);
  })

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should show header when header was passed", () => { 
    const wrapper = shallow(<ModalWrapper header={"Modal"} onCloseModal={() => {}} />);
    wrapper.setProps({ header: "Modal" });
    expect(wrapper.exists(".modal-wrapper__header")).toBeTruthy();
  })

  it("should style be hidden after component mounting", () => { 
    expect(document.body.style.overflow).toEqual("hidden");
  })

  it("should style be hidden after component unmounting", () => { 
    wrapper.unmount();
    expect(document.body.style.overflow).toEqual("visible");
  })
})
