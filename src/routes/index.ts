import * as express from "express";
import { AuthRouter } from "./AuthRouter";

export class Router {

  public static initializeRoutes(app: express.Express) {
    app.use('/oauth', new AuthRouter().router)
  }
}