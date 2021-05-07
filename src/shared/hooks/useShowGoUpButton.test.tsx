import { mount } from 'enzyme';
import React from 'react';
import { useShowGoUpButton } from './useShowGoUpButton';
import { useEventListener } from './useEventListener';

jest.mock('./useEventListener');

const TestComponent: React.FC = () => {
  const showGoUpButton = useShowGoUpButton();

  return <>{showGoUpButton && <div className="test" />}</>;
};

describe('useShowGoUpButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show div with test class when pageYOffset equal 800', () => {
    let shouldCallCalback = true;
    (useEventListener as jest.Mock).mockImplementation((_, fn) => {
      if (shouldCallCalback) {
        shouldCallCalback = false;
        fn();
      }
    });
    (window as any).pageYOffset = 800;
    const wrapper = mount(<TestComponent />);
    expect(wrapper.exists('.test')).toBeTruthy();
  });

  it("shouldn't show div with test class when pageYOffset equal 0", () => {
    let setShowGoUpButton: () => void;
    (useEventListener as jest.Mock).mockImplementation((_, fn) => {
      setShowGoUpButton = fn;
    });
    (window as any).pageYOffset = 800;
    const wrapper = mount(<TestComponent />);
    setShowGoUpButton();
    (window as any).pageYOffset = 0;
    setShowGoUpButton();
    expect(wrapper.exists('.test')).toBeFalsy();
  });
});
