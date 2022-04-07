import { RequestHandler } from 'express';
import { response } from '../responses/response';
import { getUserTimeline } from '../services/twitter';

export const userTimelineHandler: RequestHandler = async (_, res, next) => {
  try {
    res.json(
      response.success(await getUserTimeline())
    );
  } catch (err) {
    next(err);
  }
};