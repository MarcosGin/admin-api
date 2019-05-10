import * as express from "express";
import * as morgan from "morgan";
import * as config from "./config/config";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as http from "http";

import { Auth } from "./auth/auth";
import { Models } from "./models";
import { Router } from "./routes";
import { errorHandler } from "./errors/ErrorHandler";

export class App {
  public app: express.Express;

  constructor() {}

  public async initializeApp(): Promise<http.Server> {
    this.app = express();
    this.configureApp();

    this.initializeAuth();

    Router.initializeRoutes(this.app);

    this.errorHandler();

    try {
      await this.initializeDatabase();
    } catch (error) {
      console.log("Could not initialize Database", error);
    }

    return this.app.listen(this.app.get("port"));
  }

  private configureApp() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(
      morgan("dev", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: process.stderr
      })
    );
    this.app.use(
      morgan("dev", {
        skip: (req, res) => {
          return res.statusCode >= 400;
        },
        stream: process.stdout
      })
    );
  }

  private initializeDatabase() {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv) {
      const sequelizeConfig = config[nodeEnv];
      const models = new Models(sequelizeConfig);
      return models.init();
    } else {
      throw new Error("Not set NODE_ENV");
    }
  }

  private initializeAuth() {
    this.app.use(passport.initialize());
    Auth.serializeUser();
    Auth.useBasicStrategy();
    Auth.useBearerStrategy();
    Auth.useLocalStrategy();
    // Auth.useFacebookTokenStrategy();
  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server running in port", this.app.get("port"));
  }

  public getPort() {
    return this.app.get("port");
  }

  public getEnv() {
    return this.app.get("env");
  }
}
