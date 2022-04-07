import { Application } from 'express';
import statuses from './routes/statuses';

export const route = (app: Application) => {
    app.use('/statuses', statuses)
}