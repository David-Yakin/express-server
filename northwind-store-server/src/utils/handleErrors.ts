import chalk from "chalk";
import { Request, Response, NextFunction } from "express";

export const handleError = (
  res: Response,
  error: Error,
  status: number = 400
) => {
  console.log(chalk.redBright(error.message));
  return res.status(status).send(error);
};

export const handleServerError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(chalk.redBright(error.message));
  res.status(500).send(error.message);
};
