import Joi from "joi";
import { IUser } from "../models/UserModel";

export const validateLoginData = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required(),
  });
  return loginSchema.validate(login);
};

export const validateUserData = (user: IUser) => {
  const userSchema = Joi.object<IUser>({
    firstName: Joi.string().required().min(3).max(20),
    lasttName: Joi.string().required().min(3).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required(),
    active: Joi.boolean(),
  });
  return userSchema.validate(user);
};
