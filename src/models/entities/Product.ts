import { AllowNull, Column, DataType, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Category } from "./Category";
import { Brand } from "./Brand";

@Table
export class Product extends BaseModel<Product> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  stock: number;

  @Column(DataType.STRING)
  thumbnail: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Category)
  category: Category;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  categoryId: string;

  @BelongsTo(() => Brand)
  brand: Brand;

  @AllowNull(false)
  @ForeignKey(() => Brand)
  @Column(DataType.UUID)
  brandId: string;

  galleryId: string;
}
