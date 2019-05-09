import * as bcrypt from "bcrypt";

export class Utils {
  /**
   * Return a random int
   */
  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static encryptPassword(password: string ): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
