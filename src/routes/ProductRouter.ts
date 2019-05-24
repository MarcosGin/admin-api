import { Request, Response, NextFunction as Next } from "express";
import * as _ from "lodash";
import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
import { ProductManager } from "../managers/ProductManager";
import ProductCreateForm from "../models/dtos/ProductCreateForm";
import ProductUpdateForm from "../models/dtos/ProductUpdateForm";

export class ProductRouter extends BaseRouter {
  private productManager: ProductManager;

  constructor() {
    super();
    this.productManager = new ProductManager();
    this.buildRoutes();
  }

  public get = async (req: Request, res: Response, next: Next) => {
    try {
      const { page = 1, limit = 10, title, sorter } = req.query;

      let { brand: brands, category: categories } = req.query;

      const pageSize = parseInt(limit);
      const offset = (page - 1) * pageSize;

      brands = _.isArray(brands) ? _.uniq(brands) : brands;
      categories = _.isArray(categories) ? _.uniq(categories) : categories;

      const products = await this.productManager.getAll({ offset, limit: pageSize }, sorter, title, brands, categories);

      const countProduct = await this.productManager.count(title, brands, categories);

      const pagination = { total: countProduct, pageSize, current: parseInt(page) };

      res.json({ response: { list: products, pagination } });
    } catch (err) {
      next(err);
    }
  };

  public view = async (req: Request, res: Response, next: Next) => {
    try {
      const { id } = req.params;
      const product = await this.productManager.findById(id);

      res.json({ response: product });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: Next) => {
    try {
      const data = new ProductCreateForm({ ...req.body, user: req.user.id });
      const product = await this.productManager.create(data);

      res.status(201).json({ response: product });
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: Next) => {
    try {
      const { id } = req.params;
      const data = new ProductUpdateForm({ ...req.body, user: req.user.id });
      const product = await this.productManager.update(id, data);
      res.status(200).json({ response: product });
    } catch (err) {
      next(err);
    }
  };

  public remove = async (req: Request, res: Response, next: Next) => {
    try {
      const { id } = req.params;
      await this.productManager.remove(id);
      res.status(200).json({ response: true });
    } catch (err) {
      next(err);
    }
  };

  private buildRoutes() {
    this.router.get("/", Auth.getBearerMiddleware(), this.get);
    this.router.get("/:id", Auth.getBearerMiddleware(), this.view);
    this.router.post("/", Auth.getBearerMiddleware(), this.create);
    this.router.put("/:id", Auth.getBearerMiddleware(), this.update);
    this.router.delete("/:id", Auth.getBearerMiddleware(), this.remove);
  }
}
