import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { SearchIcon } from '.';

describe('SearchIcon', () => {
  it('should match first snepshot', () => {
    const wrapper = shallow(<SearchIcon />);
    expect(toJson(wrapper)).toMatchSnapshot('first');
  });
});
