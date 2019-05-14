import * as express from "express";
import { AuthRouter } from "./AuthRouter";
import { UserRouter } from "./UserRouter";

export class Router {
  public static initializeRoutes(app: express.Express) {
    app.use("/oauth", new AuthRouter().router);
    app.use("/users", new UserRouter().router);
  }
}
