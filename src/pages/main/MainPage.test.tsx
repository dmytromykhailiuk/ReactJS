import React from "react";
import { shallow } from "enzyme";
import MainPage from "./MainPage";
import {
  Banner,
  MovieBoard,
} from "./components";

describe("MainPage", () => {
  it("should render Banner and MovieBoard", () => {
    const wrapper = shallow(<MainPage />);
    const bannerComponent = wrapper.find(Banner);
    const movieBoardComponent = wrapper.find(MovieBoard);
  
    expect(bannerComponent.exists()).toBe(true);
    expect(movieBoardComponent.exists()).toBe(true);
  });
})