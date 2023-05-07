import { InferSchemaType, model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firstName: string;
  lasttName: string;
  email: string;
  password: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
    },

    lasttName: {
      type: Schema.Types.String,
    },

    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },

    password: {
      type: Schema.Types.String,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", async function (this: IUser, next) {
  if (this.isModified("email")) this.email = this.email?.toLocaleLowerCase();
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema, "users");
