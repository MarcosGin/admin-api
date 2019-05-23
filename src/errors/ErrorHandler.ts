import { AuthError } from "./AuthError";
import { LoginError } from "./LoginError";
import { NotFoundError } from "./NotFoundError";
import { ValidationError } from "./ValidationError";
import { ValidationError as SequelizeValidationError } from "sequelize";

export function errorHandler(err, req, res, next) {
  let data = { status: false, response: err.message, codeError: err.code };
  if (err instanceof AuthError) {
    return res.status(401).json(data);
  }
  if (err.name === "AuthenticationError") {
    return res.status(err.status).json(data);
  }
  if (err instanceof LoginError) {
    return res.status(400).json(data);
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json(data);
  }
  if (err instanceof SequelizeValidationError) {
    // Todo: Parse the errors to list in response err.errors <- Object with key 'path', and value 'message'
    const errSeq = new ValidationError(err.message);
    return res.status(400).json({ ...data, codeError: errSeq.code });
  }

  return res.status(500).json({ error: "Internal Server Error" });
}
