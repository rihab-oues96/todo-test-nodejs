import { InferSchemaType, model, ObjectId, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  completed?: boolean;
  comments?: ObjectId[];
  createdBy?: ObjectId;
}

const TaskSchema = new Schema({
  title: {
    type: Schema.Types.String,
  },

  description: {
    type: Schema.Types.String,
  },

  completed: {
    type: Schema.Types.Boolean,

    default: false,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

TaskSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "comment",
  localField: "_id",
});

type Task = InferSchemaType<typeof TaskSchema>;

export default model<Task>("Task", TaskSchema, "tasks");
