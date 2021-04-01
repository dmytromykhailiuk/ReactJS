import { shallow } from "enzyme";
import React from "react";
import { CreateMovieModal } from "./";
import toJson from 'enzyme-to-json';

describe("CreateMovieModal", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(
      <CreateMovieModal
        movie={{} as any}
        onCloseModal={() => {}}
        onCloseWithSaving={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })
})
