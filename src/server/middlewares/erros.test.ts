import { NextFunction, Request, Response } from "express";
import CustomError from "../../utils/CustomError";
import { generalError, notFoundError } from "./errors";

const req = {} as Partial<Request>;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

describe("Give a notFoundError middleware", () => {
  describe("When it's called response error", () => {
    test("Then should return code status 404", () => {
      const expectStatus = 404;

      notFoundError(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
    test("Then should return property error with 'Endpoint not found' message", () => {
      const expectMessage = "Endpoint not found";

      notFoundError(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ error: expectMessage });
    });
  });
});

describe("Give a generalError middleware", () => {
  const next = jest.fn();
  const error = new Error();

  describe("When receives an error response", () => {
    test("Then it should return a status code number 500", () => {
      const expectCodeStatus = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectCodeStatus);
    });
  });
  describe("When receives an error response with a custom error", () => {
    test(" Then it should return a public message saying 'Internal Server Error", () => {
      const expectPublicMessage = "Internal Server Error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectPublicMessage });
    });
  });
});
