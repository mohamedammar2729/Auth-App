import app from './app';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const init = async () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
  });
};

init();