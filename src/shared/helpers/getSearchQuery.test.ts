import { getSearchQuery } from './getSearchQuery';

describe('getSearchQuery', () => {
  it('should return null', () => {
    expect(getSearchQuery()).toEqual(null);
  });
});
