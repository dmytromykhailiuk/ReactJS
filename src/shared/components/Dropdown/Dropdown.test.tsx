import { shallow, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { useField } from 'formik';
import { Dropdown } from '.';
import { useClickOutside } from '../../hooks';

jest.mock('formik');
jest.mock('../../hooks');

const setValue = jest.fn();
const setTouched = jest.fn();

describe('Dropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useField as jest.Mock).mockImplementation(() => [null, { value: [] }, { setValue, setTouched }]);
    (useClickOutside as jest.Mock).mockImplementation(() => {});
  });
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Dropdown name="dropdown" options={[]} label="label" placeholder="placeholder" error="error" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call setTouched when closing', () => {
    (useField as jest.Mock).mockImplementation(() => [null, { value: ['s', 'q'] }, { setValue, setTouched }]);
    const wrapper = mount(<Dropdown name="dropdown" options={['q'] as any} />);
    wrapper.find('.interface').simulate('click').simulate('click');
    expect(setTouched).toHaveBeenCalled();
  });

  it('should call setValue', () => {
    (useField as jest.Mock).mockImplementation(() => [null, { value: ['s'] }, { setValue, setTouched }]);
    const wrapper = mount(<Dropdown name="dropdown" options={['q', 's'] as any} />);
    wrapper.find('.interface').simulate('click');
    wrapper.find('span').first().simulate('click');
    wrapper.find('span').last().simulate('click');
    expect(setValue).toHaveBeenCalledTimes(2);
  });

  it('should call setTouched when click ouside', () => {
    let shouldUpdate = true;
    (useClickOutside as jest.Mock).mockImplementation((_, fn) => {
      if (shouldUpdate) {
        fn();
        shouldUpdate = false;
      }
    });
    mount(<Dropdown name="dropdown" options={['q'] as any} />);
    expect(setTouched).toHaveBeenCalled();
  });
});
