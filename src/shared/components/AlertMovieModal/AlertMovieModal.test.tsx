import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { AlertMovieModal } from '.';
import { CheckboxIcon } from '../CheckboxIcon';

describe('AlertMovieModal', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(<AlertMovieModal onCloseModal={() => {}} isSuccessAlert={false} alertMessage="alert message" />);
  });
  it('shoud match snepshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shoud show 'CheckboxIcon' when isSuccessAlert equal true", () => {
    wrapper.setProps({ isSuccessAlert: true });
    expect(wrapper.exists(CheckboxIcon)).toBeTruthy();
    expect(wrapper.find('.alert-movie-modal__title').text()).toEqual('CONGRADULATIONS !');
  });
});
