import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import appRouter from './routers';

const app = express();

// we can use express-session, to get session management


app.use(express.json()); // all incoming requests will be parsed as JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
app.use(helmet()) // to secure Express apps by setting various HTTP headers
app.use(morgan('dev')); // to log HTTP requests in the console

app.use('/api/v1/auth', appRouter); // Use the appRouter for all routes under /api/v1

export default app;