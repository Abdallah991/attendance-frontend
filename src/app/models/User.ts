export class User {
  id: number;
  name: string;
  email: string;
  rememberToken: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.rememberToken = user.rememberToken;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
