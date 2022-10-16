/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as core from 'express-serve-static-core';

export type AsyncRequestHandler<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  next: NextFunction,
) => Promise<any>;

export const syncRoute = (async: AsyncRequestHandler): RequestHandler => {
  return (req, res, next) => {
    async(req, res, next).catch((err) => {
      return res.status(500).send(err);
    })
  }
}
