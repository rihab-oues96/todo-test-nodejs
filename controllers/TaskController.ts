import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import Task from "../models/TaskModel";
import CatchAsync from "../utils/CatchAsync";

export const getAllTasksByMe: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const tasks = await Task.find({ createdBy: userId });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks },
    });
  }
);

export const getTask: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);

    if (!task) return next(createHttpError(404, "no task found with that id"));

    res.status(200).json({
      status: "success",
      data: {
        data: task,
      },
    });
  }
);

export const createTask: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  }
);

export const updateTask: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findByIdAndUpdate(req.params.id);

    if (!task) return next(createHttpError(404, "no task found with that id"));

    res.status(200).json({
      status: "success",
      data: {
        data: task,
      },
    });
  }
);

export const deleteTask: RequestHandler = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = Task.findByIdAndDelete(req.params.id);

    if (!task) return next(createHttpError(404, "no task found with that id"));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const shareMyTask = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) return next(createHttpError(404, "no task found with that id"));

    res.status(200).json({
      status: "success",
      data: {
        data: task,
      },
    });
  }
);

export const getTasksSharedToMe = () => {};

export const commentTask = () => {};
