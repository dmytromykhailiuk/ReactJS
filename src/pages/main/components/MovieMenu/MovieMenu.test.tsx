import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import MovieMenu from './MovieMenu';

describe('MovieMenu', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(
      <MovieMenu
        uniqueClass={12111}
        onCloseButtonClicked={() => {}}
        onEditButtonClicked={() => {}}
        onDeleteButtonClicked={() => {}}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
