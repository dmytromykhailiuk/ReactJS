import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import {
  Component,
  PureComponent,
  FunctionalComponent,
} from "./components";

describe("App", () => {
  it("should render ClassPure, ClassReact and FuncComp", () => {
    const wrapper = shallow(<App />);
    const classReact = wrapper.find(Component);
    const classPure = wrapper.find(PureComponent);
    const funcComp = wrapper.find(FunctionalComponent);
  
    expect(classReact.exists()).toBe(true);
    expect(classPure.exists()).toBe(true);
    expect(funcComp.exists()).toBe(true);
  });
})
