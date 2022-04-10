import { Application } from 'express';
import statuses from './routes/statuses';
import posts from './routes/posts';

export const route = (app: Application) => {
  app.use('/statuses', statuses);
  app.use('/posts', posts)
}