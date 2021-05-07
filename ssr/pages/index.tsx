import React from 'react';
import { SearchPanel, Banner } from '../components';
import { MoviesAction } from '../store';
import { waitForMovies, execution } from '../shared/helpers';

function Home({ isFirstRenderOnClient }) {
  return (
    <Banner isFirstRenderOnClient={isFirstRenderOnClient}>
      <SearchPanel />
    </Banner>
  );
}

Home.getInitialProps = async ({ store, query }) => {
  if (execution.isServer) {
    store.dispatch(MoviesAction.loadMoviesAction({ searchingValue: query.SearchQuery, hasSearchingValue: true }));
    await waitForMovies(store);
    return { isFirstRenderOnClient: true };
  }
  return { isFirstRenderOnClient: false };
};

export default Home;
