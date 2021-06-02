import { history } from 'router';

export const getSearchQuery = (): string => new URLSearchParams(history.location.search).get('SearchQuery');
