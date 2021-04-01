import { shallow } from "enzyme";
import { AlertMovieModal } from "./";
import React from "react";
import toJson from 'enzyme-to-json';

describe("AlertMovieModal", () => {
  it("shoud match first snepshot", () => {
    const wrapper = shallow(
      <AlertMovieModal 
        onCloseModal={() => {}}
        isSuccessAlert={true}
        alertMessage={"alert message"}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot("first");
  });

  it("shoud match second snepshot", () => {
    const wrapper = shallow(
      <AlertMovieModal 
        onCloseModal={() => {}}
        isSuccessAlert={false}
        alertMessage={"alert message"}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("second");
  })
})