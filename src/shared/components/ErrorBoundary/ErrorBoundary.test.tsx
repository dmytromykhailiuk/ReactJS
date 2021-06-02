import { shallow, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { ErrorBoundary } from '.';

function Component() {
  return <div>Component</div>;
}

describe('ErrorBoundary', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change wiew if error', () => {
    const componentDidCatch = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    const setState = jest.spyOn(ErrorBoundary.prototype, 'setState');
    const wrapper = shallow(
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>,
    );
    wrapper.find(Component).simulateError({});
    expect(componentDidCatch).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith({ hasError: true });
    expect(wrapper.exists('h1')).toBeTruthy();
  });
});
