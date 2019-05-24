import * as express from "express";
import { AuthRouter } from "./AuthRouter";
import { UserRouter } from "./UserRouter";
import { ProductRouter } from "./ProductRouter";
import { CategoryRouter } from "./CategoryRouter";
import { BrandRouter } from "./BrandRouter";
import { NotFoundError } from "../errors/NotFoundError";

export class Router {
  public static initializeRoutes(app: express.Express) {
    app.use("/api/auth", new AuthRouter().router);
    app.use("/api/users", new UserRouter().router);
    app.use("/api/products", new ProductRouter().router);
    app.use("/api/categories", new CategoryRouter().router);
    app.use("/api/brands", new BrandRouter().router);

    app.use("*", (req: express.Request, res: express.Response, next: express.NextFunction) =>
      next(new NotFoundError("Not found this endpoint"))
    );
  }
}
