import * as bcrypt from "bcrypt";

export class Utils {
  /**
   * Return a random int
   */
  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public static async comparePassword(pass1: string | undefined, pass2: string | undefined): Promise<boolean> {
    if (pass1 && pass2) {
      return bcrypt.compare(pass1, pass2);
    } else {
      return false;
    }
  }
}
