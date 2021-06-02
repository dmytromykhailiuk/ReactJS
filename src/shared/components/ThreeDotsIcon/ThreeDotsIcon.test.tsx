import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { ThreeDotsIcon } from '.';

describe('ThreeDotsIcon', () => {
  it('should match first snepshot', () => {
    const wrapper = shallow(<ThreeDotsIcon />);
    expect(toJson(wrapper)).toMatchSnapshot('first');
  });
});
