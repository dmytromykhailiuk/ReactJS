import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import MovieList from './MovieList';

describe('MovieList', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(
      <MovieList movies={[{ id: 13211 }] as any[]} onEditMovie={() => {}} onDeleteMovie={() => {}} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
