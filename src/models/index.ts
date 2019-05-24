import { Sequelize } from "sequelize-typescript";
import { AccessToken, User, Product, Category, Brand } from "./entities";

export { AccessToken, User, Product, Category, Brand } from "./entities";
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
