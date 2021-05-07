import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import SearchPanel from './SearchPanel';

describe('MovieList', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(<SearchPanel onChangeSearchingValue={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call 'onChangeSearchingValue' with '' when submit", () => {
    const onChangeSearchingValue = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = shallow(<SearchPanel onChangeSearchingValue={onChangeSearchingValue} />);
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(onChangeSearchingValue).toHaveBeenCalledWith('');
  });
});
