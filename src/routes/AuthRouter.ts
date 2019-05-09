import * as express from "express";
import { BaseRouter } from "./BaseRouter";

export class AuthRouter extends BaseRouter {
  private authManager: any;

  constructor() {
    super();
    //this.authManager = new AuthManager(); TODO
    this.buildRoutes();
  }

  private buildRoutes() {
    this.router.post("/token", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.json({ status: true });
    });
  }
}
