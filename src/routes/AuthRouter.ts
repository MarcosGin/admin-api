import * as express from "express";
import { BaseRouter } from "./BaseRouter";
import { Oauth2 } from "../auth/oauth2";
import { Auth } from "../auth/auth";
import { AuthManager } from "../managers/AuthManager";

export class AuthRouter extends BaseRouter {
  private authManager: any;

  constructor() {
    super();
    this.authManager = new AuthManager();
    this.buildRoutes();
  }

  public async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = await this.authManager.logout(req.user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  private buildRoutes() {
    const oauth = new Oauth2();
    this.router.post("/token", oauth.getTokenEndpoint());
    this.router.post("/logout", Auth.getBearerMiddleware(), this.logout.bind(this));
  }
}
