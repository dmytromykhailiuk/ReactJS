import { shallow } from "enzyme";
import React from "react";
import { ErrorPage } from "./";
import toJson from 'enzyme-to-json';

describe("ErrorPage", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(
      <ErrorPage
        navigateToHome={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })
})
