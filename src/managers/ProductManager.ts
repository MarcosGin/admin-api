import { Product, Category, Brand, User } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class ProductManager {
  public async getAll(filters?: object) {
    // Todo: Implement filters.
    const products = await Product.findAll<Product>({
      attributes: { exclude: ["userId", "categoryId", "brandId", "deletedAt"] },
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
