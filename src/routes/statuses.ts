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
router.get('/mention_timeline', syncRoute(mentionTimelineHandler));
router.get('/hash', syncRoute(searchByHashtagHandler));
router.post(
  '/update',
  body('status').exists({ checkNull: true }).isString(),
  body('media_ids').isArray(),
  body('in_reply_to_status_id').isString(),
  body('attachment_url').isString(),
  syncRoute(updateStatusHandler),
)
router.post(
  '/destroy/:id',
  param('id').exists({ checkNull: true}).isString(),
  syncRoute(destroyStatusHandler),
)

export default router;
