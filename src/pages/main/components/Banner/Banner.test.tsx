import { shallow } from "enzyme";
import React from "react";
import { Banner } from "./";
import toJson from 'enzyme-to-json';
import { Button } from "../../../../shared/components";

describe("Banner", () => {
  it("should match snepshot", () => {
    const wrapper = shallow(
      <Banner
        isMovieInOverviewMode
        onCreateMovie={() => {}}
        onLogoClicked={() => {}}
        onSearchIconClicked={() => {}}
      >
        Children
      </Banner>
    )
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it("should show Button if 'isMovieInOverviewMode' equal false ", () => {
    const wrapper = shallow(
      <Banner
        isMovieInOverviewMode={false}
        onCreateMovie={() => {}}
        onLogoClicked={() => {}}
        onSearchIconClicked={() => {}}
      >
        Children
      </Banner>
    )
    expect(toJson(wrapper.find(Button))).toBeTruthy();
  })
})
