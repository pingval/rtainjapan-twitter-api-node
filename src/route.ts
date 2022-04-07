import { Application } from 'express';
import index from './routes/index';
import users from './routes/users';
import statuses from './routes/statuses';

export const route = (app: Application) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/statuses', statuses)
}