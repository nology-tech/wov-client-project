/**
 * Checks if the last fetch time is within five minutes of the current time.
 * @param {Date} now The current time.
 * @param {Date | null} lastFetchTime The time of the last fetch. Pass null if no fetch has occurred.
 * @returns {boolean} True if the last fetch time is within five minutes of the current time, false otherwise.
 */
export const hasFetchedInLastFiveMinutes = (
  now: Date,
  lastFetchTime: Date | null
): boolean => {
  return (
    lastFetchTime !== null &&
    Math.abs(now.getTime() - lastFetchTime.getTime()) <= 5 * 60 * 1000
  );
};
