import ErrorWithCode from "../interfaces/Errors";

class CustomError extends Error implements ErrorWithCode {
  code: string;

  constructor(
    public statusCode: number,
    public message: string,
    public publicMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
