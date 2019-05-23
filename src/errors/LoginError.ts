import { BaseError } from "./BaseError";

export class LoginError extends BaseError {
  constructor(errorString: string) {
    super(errorString, 100, LoginError.name);
  }
}
