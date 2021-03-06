import { BelongsTo, Column, DataType, ForeignKey, Table, AllowNull } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

@Table
export class AccessToken extends BaseModel<AccessToken> {
  @Column(DataType.TEXT)
  token: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;
}
