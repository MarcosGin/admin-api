import { Brand } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class BrandManager {
  public async getAll(filters?: object) {
    // Todo: Implement filters.
    const brands = await Brand.findAll<Brand>();

    if (brands) {
      return brands;
    } else {
      throw new NotFoundError("Not brands found");
    }
  }

  /**
   * Create a new brand
   * @param data
   * @returns Brand
   */
  public async create(data: object): Promise<Brand> {
    const brand = new Brand(data);

    return brand.save();
  }
}
