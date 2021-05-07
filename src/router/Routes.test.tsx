import { shallow, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Routes } from '.';
import { store } from '../store';
import { navigateToHome } from '../shared/helpers';

jest.mock('../shared/helpers');

describe('Routes', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Routes />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot with error page', () => {
    const history = {
      ...createBrowserHistory(),
      length: 1,
      location: {
        pathname: '/404',
        search: '',
        hash: '',
        state: undefined,
        key: '17mu3q',
      },
    } as any;
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>,
    );
    wrapper.find('button').simulate('click');
    expect(navigateToHome as jest.Mock).toHaveBeenCalled();
  });
});
