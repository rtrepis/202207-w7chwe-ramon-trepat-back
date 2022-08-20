import "../loadEnvironment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserJwtPayload } from "../interfaces/Users";

export const createToken = (payload: UserJwtPayload) =>
  jwt.sign(payload, process.env.KEY);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.KEY);

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);
