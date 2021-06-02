import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Button } from '.';
import { ButtonTypes, ButtonSize } from '../../enums';

describe('Button', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const onButtonClicked = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallow(<Button>Button</Button>);
  });

  it('should match snepshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should add class 'button--secondary' when type equal 'ButtonTypes.SECONDARY'", () => {
    wrapper.setProps({ type: ButtonTypes.SECONDARY });
    expect(wrapper.exists('.button--secondary')).toBeTruthy();
  });

  it("should add class 'button--small' when size equal 'ButtonSize.SMALL'", () => {
    wrapper.setProps({ size: ButtonSize.SMALL, isSubmit: true });
    expect(wrapper.exists('.button--small')).toBeTruthy();
  });

  it('should call onClick when click on button', () => {
    wrapper.setProps({ onButtonClicked });
    wrapper.find('button').simulate('click');

    expect(onButtonClicked).toHaveBeenCalled();
  });
});
