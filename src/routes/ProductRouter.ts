import { Request, Response, NextFunction as Next } from "express";
import * as _ from "lodash";
import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
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
      const { page = 1, limit = 10, title } = req.query;

      let { brand: brands, category: categories } = req.query;

      const pageSize = parseInt(limit);
      const offset = (page - 1) * pageSize;

      brands = _.isArray(brands) ? _.uniq(brands) : brands;
      categories = _.isArray(categories) ? _.uniq(categories) : categories;

      const products = await this.productManager.getAll({ offset, limit: pageSize }, title, brands, categories);

      const countProduct = await this.productManager.count(title, brands, categories);

      const pagination = { total: countProduct, pageSize, current: parseInt(page) };

      res.json({ response: { list: products, pagination } });
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
