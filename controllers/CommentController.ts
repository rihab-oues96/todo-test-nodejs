import { NextFunction, Request, RequestHandler, Response } from "express";
import CatchAsync from "../utils/CatchAsync";
import Comment from "../models/CommentModel";

export const createCommentOnTask: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    req.body.task = req.params.id;
    req.body.createdBy = req.user.id;
    const newComment = await Comment.create(req.body);

    res.status(201).json({
      status: "success",
      data: { newComment },
    });
  }
);

export const getAllComments: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Comment.find();

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: { comments },
    });
  }
);
