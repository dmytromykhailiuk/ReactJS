import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { movies } from 'mocks/movies.mock';
import { Loader } from 'shared/components';
import MovieItemDetailsView from './MovieItemDetailsView';

describe('MovieItemDetails', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(<MovieItemDetailsView movieInOverview={movies[0]} isLoading={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show Lodaer when isLoading equal 'true'", () => {
    const wrapper = shallow(<MovieItemDetailsView movieInOverview={movies[0]} isLoading />);
    expect(wrapper.exists(Loader)).toBeTruthy();
  });
});
