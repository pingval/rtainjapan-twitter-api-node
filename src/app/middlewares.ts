import { RequestHandler } from 'express';
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

export const handleTwitterError: RequestHandler<
  never,
  FailureResponse
> = (req, res, next) => {
  try {
    next();
  } catch (e) {
    if (
      e instanceof ApiRequestError
      || e instanceof ApiPartialResponseError
      || e instanceof ApiResponseError
    ) {
      return res.status(500).json(
        Response.failure(
          e.message
        )
      ) 
    }
  }
}