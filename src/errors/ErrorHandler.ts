import { AuthError } from "./AuthError";

export function errorHandler(err, req, res, next) {
  if (err instanceof AuthError) {
    return res.status(401).json(err);
  }
  if (err.name === "AuthenticationError") {
    return res.status(403).json(err);
  }

  return res.status(500).json({ error: "Internal error" });
}
