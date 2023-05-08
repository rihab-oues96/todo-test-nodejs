import { Types } from "mongoose";
import UserModel, { IUser } from "../models/UserModel";

export default class UserRepo {
  public static findById(id: Types.ObjectId): Promise<IUser | null> {
    return UserModel.findOne({ _id: id, status: true });
  }

  public static async create(user: IUser): Promise<{ user: IUser }> {
    const now = new Date();

    user.createdAt = user.updatedAt = now;

    const createdUser = await UserModel.create(user);

    return { user: createdUser.toObject() };
  }
}
