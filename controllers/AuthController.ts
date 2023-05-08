import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import User from "../models/UserModel";
import catchAsync from "../utils/CatchAsync";
const bcrypt = require("bcryptjs");

declare var process: {
  env: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
    JWT_COOKIE_EXPIRES_IN: number;
  };
};

const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = generateToken(user._id!);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  }
);

export const Login: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "missing email or password!"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(createHttpError(401, "Incorrect email or password"));
    }

    createSendToken(user, 200, res);
  }
);

export const Logout: RequestHandler = async (req, res, next) => {
  res.clearCookie("jwt");
};

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(createHttpError(401, "you are not logged in !"));
  }

  const decoded: any = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  console.log("currentUser  : ", currentUser?.firstName, currentUser?.id);

  if (!currentUser) {
    return next(
      createHttpError(401, "user with this token does no longer exist")
    );
  }

  req.user = currentUser;

  next();
};
