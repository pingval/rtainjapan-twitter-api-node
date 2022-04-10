import { RequestHandler } from 'express';
import { response } from '../responses/response';
import { createNewPost } from '../services/posts';

type NewTweetRequest = {
  content: string;
}

export const postNewTweetHandler: RequestHandler<{}, {}, NewTweetRequest> = async (req, res, next) => {
  try {
    res.json(
      response.success(await createNewPost(req.body.content))
    );
  } catch (err) {
    next(err);
  }
};