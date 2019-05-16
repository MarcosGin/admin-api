import { Request, Response, NextFunction as Next } from "express";
import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
import { AuthManager } from "../managers/AuthManager";
import { UserDTO } from "../models";
import { AuthError } from "../errors/AuthError";

export class AuthRouter extends BaseRouter {
  private authManager: any;

  constructor() {
    super();
    this.authManager = new AuthManager();
    this.buildRoutes();
  }

  public login = async (req: Request, res: Response, next: Next) => {
    try {
      Auth.authenticate(async (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user && info.message) return next(new AuthError(info.message));

        const jwt = await Auth.createToken(new UserDTO(user));

        if (jwt) {
          try {
            const saveAccess = await this.authManager.login(user, jwt);
            return res.json({ status: true, jwt: saveAccess.token });
          } catch (err) {
            return next(err);
          }
        } else {
          return res.status(400).json({
            status: false,
            message: "There was an error when trying to start your session, try again in a few minutes."
          });
        }
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: Next) => {
    try {
      const user = await this.authManager.logout(req.user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  private buildRoutes() {
    this.router.post("/login", this.login);
    this.router.post("/logout", Auth.getBearerMiddleware(), this.logout);
  }
}
