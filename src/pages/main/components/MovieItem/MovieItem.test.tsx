import { movies } from 'mocks/movies.mock';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { isClickInside } from 'shared/helpers';
import { history } from 'router';
import MovieItem from './MovieItem';

jest.mock('shared/helpers');

describe('MovieItem', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const onEditMovie = jest.fn();
  const onDeleteMovie = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = mount(<MovieItem movie={movies[0]} onEditMovie={onEditMovie} onDeleteMovie={onDeleteMovie} />);
  });

  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show 'movie__menu' after click on 'movie__three-dots'", () => {
    wrapper.find('.movie__three-dots').simulate('click');
    expect(wrapper.exists('.movie__menu')).toBeTruthy();
  });

  it("should call 'onDeleteMovie'", () => {
    wrapper.find('.movie__three-dots').simulate('click');
    wrapper.find('.movie-menu__button').last().simulate('click');
    expect(onDeleteMovie).toHaveBeenCalledWith(movies[0]);
  });

  it("should call 'onEditMovie'", () => {
    wrapper.find('.movie__three-dots').simulate('click');
    wrapper.find('.movie-menu__button').first().simulate('click');
    expect(onEditMovie).toHaveBeenCalledWith(movies[0]);
  });

  it("should call 'history.push' with `/film/${movie.id}`", () => {
    (isClickInside as jest.Mock).mockImplementation(() => true);
    const push = jest.spyOn(history, 'push');
    wrapper = mount(<MovieItem movie={movies[0]} onEditMovie={onEditMovie} onDeleteMovie={onDeleteMovie} />);
    wrapper.find('.movie').simulate('click');
    expect(push).toHaveBeenCalledWith(`/film/${movies[0].id}`);
  });
});
