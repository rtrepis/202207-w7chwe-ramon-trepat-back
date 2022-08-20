import "../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../utils/CustomError";

const debug = Debug("socialNetwork:server:middlewares/errors");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.statusCode ?? 500;
  const errorMessage = error.publicMessage ?? "Internal Server Error";

  debug(chalk.red(error.message));

  res.status(errorCode).json({ error: errorMessage });
};
