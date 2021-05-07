import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { ErrorPage } from '.';

describe('ErrorPage', () => {
  it('should match first snepshot', () => {
    const wrapper = shallow(<ErrorPage navigateToHome={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot('first');
  });
});
