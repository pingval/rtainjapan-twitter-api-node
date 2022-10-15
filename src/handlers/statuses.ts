import { RequestHandler } from 'express';
import * as Twitter from '@models/twitter';
import Response from '../responses';
import { getUserTimeline, tweet } from '@services/twitter.v1';

export const userTimelineHandler: RequestHandler = (_, res, next) => {
  getUserTimeline()
    .then((timeline) => res.json(Response.success(timeline)))
    .catch(next);
};

type UpdateStatusRequest = Pick<Twitter.v1.Post, 'status'|'media_ids'|'in_reply_to_status_id'|'attachment_url'>;

export const updateStatusHandler: RequestHandler<unknown, unknown, UpdateStatusRequest> = (req, res, next) => {
  const process = async () => {
    await tweet(req.body);
    return await getUserTimeline(true);
  }

  process()
    .then((timeline) => res.json(Response.success(timeline)))
    .catch(next);
}
