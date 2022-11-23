import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { route } from './route';
import { logging } from './logging';
import { handleTwitterError } from './middlewares';

const app = express();

app.use(express.json({
  limit: '1024m'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

logging(app);
route(app);

app.use(handleTwitterError);

export default app;
