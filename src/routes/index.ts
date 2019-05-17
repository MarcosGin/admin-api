import * as express from "express";
import { AuthRouter } from "./AuthRouter";
import { UserRouter } from "./UserRouter";
import { ProductRouter } from "./ProductRouter";
import { CategoryRouter } from "./CategoryRouter";
import { BrandRouter } from "./BrandRouter";

export class Router {
  public static initializeRoutes(app: express.Express) {
    app.use("/oauth", new AuthRouter().router);
    app.use("/users", new UserRouter().router);
    app.use("/products", new ProductRouter().router);
    app.use("/categories", new CategoryRouter().router);
    app.use("/brands", new BrandRouter().router);
  }
}
