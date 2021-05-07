import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import ReactDOM from 'react-dom';
import ModalWrapperView from './ModalWrapperView';

jest.mock('react-dom');
(ReactDOM.createPortal as jest.Mock).mockImplementation((arg) => arg);

describe('ModalWrapper', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(
      <ModalWrapperView modalWrapperRef={{} as any} errorMessages={['1', '2']} onCloseModal={() => {}} />,
    );
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should show header when header was passed', () => {
    const wrapper = shallow(
      <ModalWrapperView
        errorMessages={['1', '2']}
        modalWrapperRef={{} as any}
        header="Modal"
        onCloseModal={() => {}}
      />,
    );
    wrapper.setProps({ header: 'Modal' });
    expect(wrapper.exists('.modal-wrapper__header')).toBeTruthy();
  });
});
