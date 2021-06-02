import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { useShowGoUpButton } from '../../hooks';
import { GoUpButton } from '.';

jest.mock('../../hooks');

describe('GoUpButton', () => {
  it('should match first snapshot', () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(true);
    const wrapper = shallow(<GoUpButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should contains 'scroll-btn--hide'", () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(false);
    const wrapper = shallow(<GoUpButton />);
    expect(wrapper.exists('.scroll-btn--hide')).toBeTruthy();
  });

  it('should call useShowGoUpButton function', () => {
    (useShowGoUpButton as jest.Mock).mockReturnValue(true);
    shallow(<GoUpButton />);
    expect(useShowGoUpButton).toHaveBeenCalled();
  });
});
