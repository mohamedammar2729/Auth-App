import { redisClient } from "./connection";


export const setCache = async (key: string, data:string, EX:number) => {
  try {
    // EX: directly set the expiration time in seconds
    // NX: only set the key if it does not already exist
    await redisClient.set(key, data, {EX}); // Set cache with 24 hours expiration
    console.log(`Redis: Set cache: ${key} Value: ${data}`);
  } catch (error) {
    console.error(`Redis: Error setting cache for key ${key}:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      console.log(`Redis: Cache hit for key: ${key} Value: ${data}`);
      return data; // Return the cached data
    } else {
      console.log(`Redis: Cache miss for key: ${key}`);
      return null; // Return null if no data found
    }
  } catch (error) {
    console.error(`Redis: Error getting cache for key ${key}:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
