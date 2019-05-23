import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
import { Request, Response, NextFunction as Next } from "express";
import { CategoryManager } from "../managers/CategoryManager";

export class CategoryRouter extends BaseRouter {
  private categoryManager: CategoryManager;

  constructor() {
    super();
    this.categoryManager = new CategoryManager();
    this.buildRoutes();
  }

  public get = async (req: Request, res: Response, next: Next) => {
    try {
      const categories = await this.categoryManager.getAll();
      res.json({ response: categories });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: Next) => {
    try {
      const data = req.body;
      const category = await this.categoryManager.create({ ...data, userId: req.user.id });

      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  };

  private buildRoutes() {
    this.router.get("/", Auth.getBearerMiddleware(), this.get);
    this.router.post("/", Auth.getBearerMiddleware(), this.create);
  }
}
