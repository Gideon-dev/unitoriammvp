export const CACHE_TTL = 10 * 60 * 1000; // 10 minutes by default

export const isCacheValid = (timestamp?: number, ttl = CACHE_TTL) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < ttl;
};
// console.log(isCacheValid)
