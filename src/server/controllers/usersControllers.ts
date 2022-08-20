import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import {
  UserLogin,
  UserSchema,
  UserJwtPayload,
  BodyUserRegister,
} from "../../interfaces/Users";
import { createToken, hashCompare, hashCreator } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as UserLogin;

  const userError = new CustomError(
    403,
    "User not found",
    "Invalid user/password"
  );

  let findUsers: Array<UserSchema>;
  try {
    findUsers = await User.find({ userName: user.userName });
    if (findUsers.length === 0) {
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message: ${(error as Error).message}`,
      "Invalid user/password"
    );
    next(finalError);
    return;
  }

  try {
    const isPasswdValid = await hashCompare(
      user.password,
      findUsers[0].password
    );
    if (!isPasswdValid) {
      userError.message = "Invalid password";
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message:  ${(error as Error).message}`,
      "Invalid user/password"
    );
    next(finalError);
    return;
  }

  const payLoad: UserJwtPayload = {
    id: findUsers[0].id,
    userName: findUsers[0].userName,
  };

  const responseUserData = {
    user: {
      token: createToken(payLoad),
    },
  };

  res.status(200).json(responseUserData);
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: BodyUserRegister = req.body;

  user.password = await hashCreator(user.password);

  try {
    const newUser = await User.create(user);

    res.status(201).json({ user: newUser });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new user"
    );
    next(customError);
  }
};
