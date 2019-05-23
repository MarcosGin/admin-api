import { User } from "../index";

export class UserDTO {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public avatar: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = user.avatar;
  }
}
