// insted of create single connection, we will create a connection pool
// if many requests come to server, each request will get a connection from the available pool
// this will help us to avoid creating a new connection for each request
// and also avoid the overhead of closing the connection after each request

import { createPool, Pool } from 'mysql2/promise';
import { CREATE_TABLE_USERS } from './tabels';

let pool: Pool;

const connectToDatabase = async () => {
  try {
    pool = createPool({
      port: +process!.env!.MYSQL_PORT!,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    await pool.getConnection();
    console.log('Connected to MySQL database successfully');
    await pool.execute(CREATE_TABLE_USERS);
    console.log('Users table created successfully or already exists');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export {
  connectToDatabase,
  pool, // Export the pool to be used in other modules
};
