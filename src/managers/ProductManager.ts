import { Op } from "sequelize";
import * as _ from "lodash";
import { Product, Category, Brand, User } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class ProductManager {
  public async getAll({ offset, limit }, sorter?: string, title?: string, brands?: number[], categories?: number[]) {
    const products = await Product.findAll<Product>({
      where: this.getFilters(title, brands, categories),
      attributes: { exclude: ["userId", "categoryId", "brandId", "deletedAt"] },
      limit,
      offset,
      order: this.getOrder(sorter),
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Category, attributes: ["id", "name"] },
        { model: Brand, attributes: ["id", "name"] }
      ]
    });

    if (products) {
      return products;
    } else {
      throw new NotFoundError("Not products found");
    }
  }

  public async count(title?: string, brands?: number[], categories?: number[]) {
    const products = await Product.count({
      where: this.getFilters(title, brands, categories)
    });

    if (products) {
      return products;
    } else {
      throw new NotFoundError("Not products found");
    }
  }

  private getFilters(title?: string, brands?: number[], categories?: number[]) {
    const filters = <any>{};

    if (title) {
      filters.title = { [Op.like]: `%${title}%` };
    }

    if (brands) {
      filters.brandId = { [_.isArray(brands) ? Op.in : Op.eq]: brands };
    }

    if (categories) {
      filters.categoryId = { [_.isArray(categories) ? Op.in : Op.eq]: categories };
    }
    return filters;
  }

  private getOrder(sorter?: string) {
    // Todo: add more validations in sort.
    const sort = <any>[];
    if (sorter) {
      const keys = sorter.split("_");
      sort.push(keys);
    }

    return sort;
  }

  /**
   * Create a new product
   * @param data
   * @returns Product
   */
  public async create(data: object): Promise<Product> {
    const product = new Product(data);

    return product.save();
  }
}
