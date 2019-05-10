import { Sequelize } from "sequelize-typescript";

import { AccessToken } from "./entities/AccessToken";
import { AuthorizationCode } from "./entities/AuthorizationCode";
import { Client } from "./entities/Client";
import { User } from "./entities/User";

export { AccessToken } from "./entities/AccessToken";
export { AuthorizationCode } from "./entities/AuthorizationCode";
export { Client } from "./entities/Client";
export { User } from "./entities/User";

export class Models {
  public sequelize: Sequelize;

  constructor(config: any) {
    this.sequelize = new Sequelize(config);
  }

  public init() {
    this.sequelize.addModels(this.getModels());
    return this.sequelize.sync({ logging: false });
  }

  // Todo: get by directory path
  private getModels() {
    return [AccessToken, AuthorizationCode, Client, User];
  }
}
