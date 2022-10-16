import { Application } from 'express';
import statuses from '@routes/statuses';
import posts from '@routes/posts';
import media from '@routes/media';

export const route = (app: Application) => {
  app.use('/statuses', statuses);
  app.use('/posts', posts);
  app.use('/media', media);
}