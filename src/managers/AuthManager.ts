import { User, AccessToken } from "../models";
import { NotFoundError } from "../errors/NotFoundError";

export class AuthManager {
  public async getUserByToken(token: string): Promise<any> {
    const storedToken = await AccessToken.findOne<AccessToken>({ where: { token }, include: [User] });
    if (storedToken && storedToken.user) {
      return storedToken.user;
    } else {
      throw new NotFoundError("No user found with provided token");
    }
  }

  public async getAccessTokenForUser(userId: string): Promise<any> {
    const accessToken = await AccessToken.findOne({ where: { userId } });
    if (accessToken) {
      return accessToken;
    } else {
      throw new NotFoundError("No access token found for the provided user");
    }
  }

  public async login(user: User, token: string): Promise<any> {
    const create = new AccessToken({ token, userId: user.id });

    return create.save();
  }

  public async logout(user: User): Promise<any> {
    const accessToken = await AccessToken.findOne({ where: { userId: user.id } });
    if (accessToken) {
      return accessToken.destroy();
    } else {
      throw new NotFoundError("No access token found for the provided user");
    }
  }
}
