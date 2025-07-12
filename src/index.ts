import app from './app';
import { config } from 'dotenv';
import { connectToDatabase } from './mysql/connection';
import { connectToRedis } from './redis/connection';

config(); // Load environment variables from .env file

const init = async () => {
  try {
    await connectToDatabase();
    await connectToRedis();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is Listening on port ${port}`);
    });
    
  } catch (error) {
    console.log('Failed to initialize the application:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

init();

