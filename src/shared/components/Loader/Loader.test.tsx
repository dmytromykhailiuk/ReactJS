import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Loader } from '.';

describe('Loader', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
