import { Request, Response, NextFunction as Next } from "express";
import { BaseRouter } from "./BaseRouter";
import { UserManager } from "../managers/UserManager";
import { Auth } from "../auth/auth";
import { UserDTO, User } from "../models";

export class UserRouter extends BaseRouter {
  private userManager: any;

  constructor() {
    super();
    this.userManager = new UserManager();
    this.buildRoutes();
  }

  public get = async (req: Request, res: Response, next: Next) => {
    try {
      const email = req.query.email;
      if (email) {
        const user = await this.userManager.findByEmail(email);
        res.json(new UserDTO(user));
      } else {
        const users = await this.userManager.getAll();
        const usersDTOs = users.map((user: User) => new UserDTO(user));
        res.json(usersDTOs);
      }
    } catch (err) {
      next(err);
    }
  };

  public create = async (req: Request, res: Response, next: Next) => {
    try {
      const data = req.body;
      const user = await this.userManager.create(data);

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  private buildRoutes() {
    this.router.get("/", Auth.getBearerMiddleware(), this.get);
    this.router.post("/", Auth.getBearerMiddleware(), this.create);
  }
}
