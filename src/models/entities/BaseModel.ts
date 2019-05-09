import { Column, CreatedAt, UpdatedAt, DeletedAt, IsUUID, 
  Model, PrimaryKey, DataType, Table, Default} from "sequelize-typescript";

@Table
export class BaseModel<T> extends Model<T> {
  
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

}