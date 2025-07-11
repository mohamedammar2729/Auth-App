import { createClient } from 'redis';

// Create a Redis client with default options
// it will connect to localhost:6379
// You can customize the connection options as needed when in production
// For example, you can specify the host, port, and password if required
let redisClient = createClient();

const connectToRedis = async () => {
  try {
    redisClient.on('error', (err) => {
      console.error('Error event occurred in redis', err);
    });
    // Connect to the Redis server
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export {
  connectToRedis,
  redisClient, // Export the redis client to be used in other modules
}