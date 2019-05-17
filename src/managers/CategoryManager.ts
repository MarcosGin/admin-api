import { Category } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class CategoryManager {
  public async getAll(filters?: object) {
    // Todo: Implement filters.
    const categories = await Category.findAll<Category>();

    if (categories) {
      return categories;
    } else {
      throw new NotFoundError("Not categories found");
    }
  }

  /**
   * Create a new category
   * @param data
   * @returns Category
   */
  public async create(data: object): Promise<Category> {
    const category = new Category(data);

    return category.save();
  }
}
