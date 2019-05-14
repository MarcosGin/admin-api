import { User } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class UserManager {
  public async getAll(filters?: object) {
    // Todo: Implement filters.
    const users = await User.findAll<User>();

    if (users) {
      return users;
    } else {
      throw new NotFoundError("Not users found");
    }
  }
  /**
   * Find a user by email
   * @param email
   * @returns User
   */
  public async findByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return user;
    } else {
      throw new NotFoundError("Not user found with this email");
    }
  }
  /**
   * Create a new user
   * @param data
   * @returns User
   */
  public async create(data: object): Promise<User> {
    const user = new User(data);

    return user.save();
  }
}
