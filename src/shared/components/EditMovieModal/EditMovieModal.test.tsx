import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { EditMovieModal } from '.';

describe('EditMovieModal', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(<EditMovieModal movie={{} as any} onCloseModal={() => {}} onCloseWithSaving={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
