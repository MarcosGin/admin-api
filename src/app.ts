import * as express from "express";
import * as morgan from "morgan";
import * as config from "./config/config";
import * as bodyParser from "body-parser";
import { Models } from "./models";
import { Router } from "./routes";

export class App {

  private app: express.Express;

  constructor(private port?: number | string) {
    this.app = express();
    this.configureApp();

    /*
    TODO: Initialize auth0
    this.initializeAuth();
    */
   
    Router.initializeRoutes(this.app);

    try{
      this.initializeDatabase()
    }catch(error){
      console.log("Could not initialize Database", error);
    }

  }

  private configureApp() {
    this.app.set('port', this.port || process.env.PORT || 3000 )
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev', { skip: (req, res) => { return res.statusCode < 400 }, stream: process.stderr }));
    this.app.use(morgan('dev', { skip: (req, res) => { return res.statusCode >= 400 }, stream: process.stdout }));
  }

  private initializeDatabase() {
    const nodeEnv = process.env.NODE_ENV;
    if(nodeEnv){
      const sequelizeConfig = config[nodeEnv];
      const models = new Models(sequelizeConfig);
      return models.init();
    }else {
      throw new Error("Not set NODE_ENV");
    }

  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server running in port', this.app.get('port'))
  }

}