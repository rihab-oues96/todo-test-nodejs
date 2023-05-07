import { Request, Response } from "express";
import createHttpError from "http-errors";
import catchAsync from "../utils/CatchAsync";

export const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: any) => {
    const docs = await Model.find();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

export const getOne = (Model: any, popOptions?: string) =>
  catchAsync(async (req: Request, res: Response, next: any) => {
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(createHttpError(404, "No document found with that id "));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: any) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  });

export const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: any) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(createHttpError(404, "No doc found with that id "));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: any) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(createHttpError(404, "No document found with that ID"));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
