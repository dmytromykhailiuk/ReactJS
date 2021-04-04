import { shallow } from "enzyme";
import React from "react";
import toJson from 'enzyme-to-json';
import MovieItemDetails from "./MovieItemDetails";
import { movies } from "mocks/movies.mock";

describe("MovieItemDetails", () => {
  it("should match snepshot", () => {
    const wrapper = shallow(
      <MovieItemDetails
        movie={movies[0]}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
