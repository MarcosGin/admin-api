import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
import { Request, Response, NextFunction as Next } from "express";
import { ProductManager } from "../managers/ProductManager";

export class ProductRouter extends BaseRouter {
  private productManager: ProductManager;

  constructor() {
    super();
    this.productManager = new ProductManager();
    this.buildRoutes();
  }

  public get = async (req: Request, res: Response, next: Next) => {
    try {
      const products = await this.productManager.getAll();
      res.json({ products });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: Next) => {
    try {
      const data = req.body;
      const product = await this.productManager.create({ ...data, userId: req.user.id });

      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  };

  private buildRoutes() {
    this.router.get("/", Auth.getBearerMiddleware(), this.get);
    this.router.post("/", Auth.getBearerMiddleware(), this.create);
  }
}
