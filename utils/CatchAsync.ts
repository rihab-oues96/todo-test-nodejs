import { NextFunction, Request, Response } from "express";

type CatchAsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const CatchAsync = (fn: CatchAsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default CatchAsync;
