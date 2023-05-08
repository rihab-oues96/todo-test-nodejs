import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import User from "../models/UserModel";
import CatchAsync from "../utils/CatchAsync";

export const getMe: RequestHandler = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  req.params.id = req.user.id;
  next();
};

export const getAllUsers: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  }
);

export const getUser: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(createHttpError(404, "no user found with that id"));

    res.status(200).json({
      status: "success",
      data: { data: user },
    });
  }
);

export const createUser: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }
);

export const updateUser: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return next(createHttpError(404, "no user found with that id"));

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }
);

export const deleteUser: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return next(createHttpError(404, "no user found with that id"));

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
