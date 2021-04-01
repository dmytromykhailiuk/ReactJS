import { shallow } from "enzyme";
import React from "react";
import { DeleteMovieModal } from "./";
import toJson from 'enzyme-to-json';
import { Button } from '../Button';

describe("DeleteMovieModal", () => {
  it("should match first snepshot", () => {
    const wrapper = shallow(
      <DeleteMovieModal
        movie={{} as any}
        onCloseModal={() => {}}
        onCloseWithSaving={() => {}}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot("first");
  })

  it("should call onCloseWithSaving with movie when click on button occurred", () => {
    const onClick = jest.fn();
    const movie = {} as any;
    const wrapper = shallow(
      <DeleteMovieModal
        movie={movie}
        onCloseModal={() => {}}
        onCloseWithSaving={onClick}
      />
    )
    wrapper.find(Button).dive().find("button").simulate("click");
    expect(onClick).toHaveBeenCalledWith(movie);
  })
})
