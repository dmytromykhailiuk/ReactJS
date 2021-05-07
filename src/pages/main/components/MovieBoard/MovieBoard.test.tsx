import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Button, Loader } from 'shared/components';
import { Categories, SortingOptionsProperties } from '../../../../shared/enums';
import MovieBoardView from './MovieBoardView';

describe('MovieBoardView', () => {
  it('should match snepshot', () => {
    const wrapper = shallow(
      <MovieBoardView
        movies={[{ id: 2 }] as any[]}
        movieBoardRef={{} as any}
        category={Categories.ALL}
        sortingOption={SortingOptionsProperties.RELEASE_DATE}
        isDownDirection
        moviesLoading={false}
        moviesAmount={10}
        moreMoviesLoaded
        loaded
        onEditMovie={() => {}}
        onDeleteMovie={() => {}}
        setCategory={() => {}}
        setSortingOption={() => {}}
        setIsDownDirectionValue={() => {}}
        showMoreMovies={() => {}}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show 'No Movies Dound' message", () => {
    const wrapper = shallow(
      <MovieBoardView
        movies={[] as any[]}
        movieBoardRef={{} as any}
        category={Categories.ALL}
        sortingOption={SortingOptionsProperties.RELEASE_DATE}
        isDownDirection
        moviesLoading={false}
        moviesAmount={0}
        moreMoviesLoaded
        loaded
        onEditMovie={() => {}}
        onDeleteMovie={() => {}}
        setCategory={() => {}}
        setSortingOption={() => {}}
        setIsDownDirectionValue={() => {}}
        showMoreMovies={() => {}}
      />,
    );

    expect(wrapper.find('.movie-board__no-movie-found').text()).toEqual('No Movie Found');
  });

  it('should show Loader', () => {
    const wrapper = shallow(
      <MovieBoardView
        movies={[] as any[]}
        movieBoardRef={{} as any}
        category={Categories.ALL}
        sortingOption={SortingOptionsProperties.RELEASE_DATE}
        isDownDirection
        moviesLoading
        moviesAmount={10}
        moreMoviesLoaded
        loaded={false}
        onEditMovie={() => {}}
        onDeleteMovie={() => {}}
        setCategory={() => {}}
        setSortingOption={() => {}}
        setIsDownDirectionValue={() => {}}
        showMoreMovies={() => {}}
      />,
    );
    expect(wrapper.exists(Loader)).toBeTruthy();
  });

  it("should not show 'more movies' button", () => {
    const wrapper = shallow(
      <MovieBoardView
        movies={[{ id: 2 }] as any[]}
        movieBoardRef={{} as any}
        category={Categories.ALL}
        sortingOption={SortingOptionsProperties.RELEASE_DATE}
        isDownDirection
        moviesLoading={false}
        moviesAmount={10}
        moreMoviesLoaded={false}
        loaded
        onEditMovie={() => {}}
        onDeleteMovie={() => {}}
        setCategory={() => {}}
        setSortingOption={() => {}}
        setIsDownDirectionValue={() => {}}
        showMoreMovies={() => {}}
      />,
    );
    expect(wrapper.exists(Button)).toBeFalsy();
  });
});
