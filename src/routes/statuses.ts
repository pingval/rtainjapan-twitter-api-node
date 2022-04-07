import express from 'express';
import { userTimelineHandler } from '../handlers/statuses';

const router = express.Router();

router.get('/user_timeline', userTimelineHandler);

export default router;
