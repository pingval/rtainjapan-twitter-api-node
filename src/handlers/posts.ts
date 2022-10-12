import { RequestHandler } from 'express';
import Response from '../responses';
import { createNewPost } from '@services/posts';

type NewTweetRequest = {
  content: string;
}

export const postNewTweetHandler: RequestHandler<unknown, unknown, NewTweetRequest> = (req, res, next) => {
  createNewPost(req.body.content)
    .then((created) => {
      res.json(Response.success(created))
    })
    .catch(next);
};