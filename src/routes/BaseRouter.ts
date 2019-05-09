import * as express from "express";

export class BaseRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    // Set middlewares
  }
}