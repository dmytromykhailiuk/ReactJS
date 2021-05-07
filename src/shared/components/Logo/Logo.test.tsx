import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Logo } from '.';

describe('Logo', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Logo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
