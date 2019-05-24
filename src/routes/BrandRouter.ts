import { BaseRouter } from "./BaseRouter";
import { Auth } from "../auth/auth";
import { Request, Response, NextFunction as Next } from "express";
import { BrandManager } from "../managers/BrandManager";

export class BrandRouter extends BaseRouter {
  private brandManager: BrandManager;

  constructor() {
    super();
    this.brandManager = new BrandManager();
    this.buildRoutes();
  }

  public get = async (req: Request, res: Response, next: Next) => {
    try {
      const brands = await this.brandManager.getAll();
      res.json({ response: brands });
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: Next) => {
    try {
      const data = req.body;
      const brand = await this.brandManager.create({ ...data, userId: req.user.id });

      res.status(201).json(brand);
    } catch (err) {
      next(err);
    }
  };

  private buildRoutes() {
    this.router.get("/", Auth.getBearerMiddleware(), this.get);
    this.router.post("/", Auth.getBearerMiddleware(), this.create);
  }
}
