import { AuthError } from "./AuthError";
import { NotFoundError } from "./NotFoundError";
import { ValidationError } from "./ValidationError";
import { ValidationError as SequelizeValidationError } from "sequelize";

export function errorHandler(err, req, res, next) {
  if (err instanceof AuthError) {
    return res.status(401).json(err);
  }
  if (err.name === "AuthenticationError") {
    return res.status(err.status).json(err);
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json(err);
  }
  if (err instanceof SequelizeValidationError) {
    // Todo: Parse the errors to list in response err.errors <- Object with key 'path', and value 'message'
    return res.status(400).json(new ValidationError(err.message));
  }

  return res.status(500).json({ error: "Internal Servererror" });
}
