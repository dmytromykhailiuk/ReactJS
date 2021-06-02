import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { CloseMenuButton } from '.';

describe('CheckboxIcon', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<CloseMenuButton onCloseButtonClicked={onClick}>Button</CloseMenuButton>);
  });
  it('should match first snepshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot('first');
  });

  it("should add class 'close-menu-button__button--small' when passed isSmall option", () => {
    wrapper.setProps({ isSmall: true });
    expect(wrapper.exists('.close-menu-button__button--small')).toBeTruthy();
  });

  it('should call onClick when click on button', () => {
    wrapper.find('div div').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
