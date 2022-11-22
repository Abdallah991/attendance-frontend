export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  rememberToken: string;
  password: string;
  joinDate: string;
  phone: string;
  gender: string;
  position: string;
  dob: string;
  fcmToken: string;
  permission: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.rememberToken = user.rememberToken;
    this.password = user.password;
    this.position = user.position;
    this.joinDate = user.joinDate;
    this.gender = user.gender;
    this.phone = user.phone;
    this.dob = user.dob;
    this.fcmToken = user.fcmToken;
    this.permission = user.permission;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
