import { Date, InferSchemaType, model, ObjectId, Schema } from "mongoose";

export interface IComment extends Document {
  comment: string;
  createdAt: Date;
  task: string;
  createdBy: ObjectId;
}

const CommentSchema = new Schema(
  {
    comment: {
      type: Schema.Types.String,
    },

    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },

    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

type Comment = InferSchemaType<typeof CommentSchema>;

export default model<Comment>("Comment", CommentSchema, "comments");
