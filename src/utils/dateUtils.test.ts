import { hasFetchedInLastFiveMinutes } from './dateUtils';

describe('hasFetchedInLastFiveMinutes', () => {
  it('should return false when lastFetchTime is null', () => {
    const now = new Date();
    const lastFetchTime = null;
    expect(hasFetchedInLastFiveMinutes(now, lastFetchTime)).toBe(false);
  });

  it('should return true when the difference is less than 5 minutes', () => {
    const now = new Date();
    const lastFetchTime = new Date(now.getTime() - 4 * 60 * 1000);
    expect(hasFetchedInLastFiveMinutes(now, lastFetchTime)).toBe(true);
  });

  it('should return false when the difference is greater than 5 minutes', () => {
    const now = new Date();
    const lastFetchTime = new Date(now.getTime() - 6 * 60 * 1000);
    expect(hasFetchedInLastFiveMinutes(now, lastFetchTime)).toBe(false);
  });

  it('should return true when the difference is exactly 5 minutes', () => {
    const now = new Date();
    const lastFetchTime = new Date(now.getTime() - 5 * 60 * 1000);
    expect(hasFetchedInLastFiveMinutes(now, lastFetchTime)).toBe(true);
  });
});
