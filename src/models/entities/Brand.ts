import { AllowNull, Column, DataType, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

@Table
export class Brand extends BaseModel<Brand> {
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;
}
