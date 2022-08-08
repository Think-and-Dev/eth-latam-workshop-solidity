export const getUnlockTime = () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  return currentTimestampInSeconds + ONE_YEAR_IN_SECS;
};
