import { validateInput } from '@app/middlewares';
import express from 'express';
import { body, param } from 'express-validator';
import { syncRoute } from '../handlers';
import {
  destroyStatusHandler,
  mentionTimelineHandler,
  searchByHashtagHandler,
  updateStatusHandler,
  userTimelineHandler
} from '../handlers/statuses';

const router = express.Router();

router.get('/user_timeline', syncRoute(userTimelineHandler));
router.get('/mentions_timeline', syncRoute(mentionTimelineHandler));
router.get('/hash', syncRoute(searchByHashtagHandler));
router.post(
  '/update',
  body('status').exists({ checkNull: true }),
  body('media_ids').isArray().optional(),
  body('in_reply_to_tweet_id').isString().optional({ nullable: true }),
  body('quote_tweet_id').isString().optional({ nullable: true }),
  validateInput,
  syncRoute(updateStatusHandler),
)
router.post(
  '/destroy/:id',
  param('id').exists({ checkNull: true}).isString(),
  validateInput,
  syncRoute(destroyStatusHandler),
)

export default router;
