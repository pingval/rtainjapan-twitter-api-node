import express from 'express';
import { body } from 'express-validator';
import { syncRoute } from '../handlers';
import {
  mentionTimelineHandler,
  updateStatusHandler,
  userTimelineHandler
} from '../handlers/statuses';

const router = express.Router();

router.get('/user_timeline', syncRoute(userTimelineHandler));
router.get('/mention_timeline', syncRoute(mentionTimelineHandler));
router.post(
  '/update',
  body('status').exists({ checkNull: true }).isString(),
  body('media_ids').isArray(),
  body('in_reply_to_status_id').isString(),
  body('attachment_url').isString(),
  syncRoute(updateStatusHandler),
)

export default router;
