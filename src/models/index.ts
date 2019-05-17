import { Sequelize } from "sequelize-typescript";

import { AccessToken } from "./entities/AccessToken";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Category } from "./entities/Category";
import { Brand } from "./entities/Brand";

export { AccessToken } from "./entities/AccessToken";
export { User } from "./entities/User";
export { Product } from "./entities/Product";
export { Category } from "./entities/Category";
export { Brand } from "./entities/Brand";
export { UserDTO } from "./dtos/UserDTO";

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
    return [User, AccessToken, Product, Category, Brand];
  }
}
