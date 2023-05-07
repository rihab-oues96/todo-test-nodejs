import { InferSchemaType, model, Schema } from "mongoose";

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

    creator: {
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
