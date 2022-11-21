import { TwitterError } from '@infrastructure/tweets';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import {
  ApiPartialResponseError,
  ApiRequestError,
  ApiResponseError
} from 'twitter-api-v2';
import Response, { FailureResponse } from '../responses';

export const validateInput: RequestHandler<
  never,
  FailureResponse
> = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(
      Response.failure(
        errors.array().map(
          err => `${err.param}: ${err.msg as string}`
        ).join('\n')
      )
    );
  }

  next();
};

export const handleTwitterError: ErrorRequestHandler<
  never,
  FailureResponse
> = (err, _, res, next) => {
  if (err instanceof TwitterError) {
    return res.status(500).json(
      Response.failure(err.message)
    ) 
  }

  return res.status(500).json(
    Response.failure(err as string)
  );
}