import { getPageYOffsetValue } from './getPageYOffsetValue';

describe('getPageYOffsetValue', () => {
  it('should return pageYOffset value', () => {
    (window as any).pageYOffset = 200;
    expect(getPageYOffsetValue()).toEqual(200);
  });
});
