import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import Task from "../models/TaskModel";
import CatchAsync from "../utils/CatchAsync";

export const setTasksUsersIds = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.task) req.body.task = req.params.taskId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllTasksByMe: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ createdBy: req.user.id });

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
  async (req: any, res: Response, next: NextFunction) => {
    req.body.createdBy = req.user.id;
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  }
);

export const updateTask: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return next(createHttpError(404, "no task found with that id"));

    const idString = task.createdBy?.toString();
    const creator = idString?.substring(0, 24);

    if (creator !== req.user.id) {
      return next(
        createHttpError(401, "you are not allowed to modify this task")
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: task,
      },
    });
  }
);

export const deleteTask: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const task: any = Task.findById(req.params.id);

    if (!task) return next(createHttpError(404, "no task found with that id"));

    const idString = task.createdBy?.toString();
    const creator = idString?.substring(0, 24);

    if (creator !== req.user.id) {
      return next(
        createHttpError(401, "you are not allowed to delete this task")
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const shareMyTask: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    req.body.sharedTo;

    const task = await Task.findById(req.params.id);

    if (!task) return next(createHttpError(404, "no task found with that id"));

    const idString = task.createdBy?.toString();
    const creator = idString?.substring(0, 24);

    if (creator !== req.user.id) {
      return next(
        createHttpError(401, "you are not allowed to share this task")
      );
    }

    task!.sharedTo = [...req.body.sharedTo];

    const UpdatedTask = await task.save();

    res.status(200).json({
      status: "success",
      data: {
        data: UpdatedTask,
      },
    });
  }
);

export const getTasksSharedToMe: RequestHandler = CatchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const me = req.user.id;

    const tasks = await Task.find({ sharedTo: me });

    res.status(200).json({
      status: "sucess",
      data: {
        data: tasks,
      },
    });
  }
);
