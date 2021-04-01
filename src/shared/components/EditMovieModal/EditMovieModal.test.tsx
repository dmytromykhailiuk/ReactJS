import { shallow } from "enzyme";
import React from "react";
import { EditMovieModal } from "./";
import toJson from 'enzyme-to-json';

describe("EditMovieModal", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(
      <EditMovieModal
        movie={{} as any}
        onCloseModal={() => {}}
        onCloseWithSaving={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })
})