import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import appRouter from './routers';
import cookieParser from 'cookie-parser';

const app = express();

// cookie parser is used to set cookies to frontend
// should provide a secret key for cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json()); // all incoming requests will be parsed as JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
app.use(helmet()); // to secure Express apps by setting various HTTP headers
app.use(morgan('dev')); // to log HTTP requests in the console

app.use((req, res, next) => {
  console.log('request received:');
  console.log('URL:', req.baseUrl + req.url);
  console.log(JSON.stringify(req.headers));
  next();
});

app.use('/api', appRouter); // Use the appRouter for all routes under /api

//@ts-ignore
app.use((err, req, res, next) => {
  return res.status(500).json({ message: "Error" });
});



export default app;

// we can use express-session, to get session management
