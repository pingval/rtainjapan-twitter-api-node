import express from 'express';
import { body } from 'express-validator';
import { postNewTweetHandler } from '../handlers/posts';

const router = express.Router();

router.post(
  '/',
  body('content').exists({checkNull: true}),
  postNewTweetHandler,
);

export default router;