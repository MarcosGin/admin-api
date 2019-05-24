import {
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  IsUUID,
  Model,
  PrimaryKey,
  DataType,
  Table,
  Default
} from "sequelize-typescript";

@Table
export class BaseModel<T> extends Model<T> {
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
