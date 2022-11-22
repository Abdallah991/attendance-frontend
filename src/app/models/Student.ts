import { Cohort } from './Cohort';

export class Student {
  id: number;
  firstName: string;
  lastName: string;
  cohort: Cohort;
  nationality: string;
  phone: string;
  gender: string;
  supportedByTamkeen: string;
  password: string;
  email: string;
  dob: string;
  fcmToken: string;
  createdAt: string;
  updatedAt: string;

  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.cohort = student.cohort;
    this.nationality = student.nationality;
    this.gender = student.gender;
    this.phone = student.phone;
    this.supportedByTamkeen = student.supportedByTamkeen;
    this.password = student.password;
    this.email = student.email;
    this.dob = student.dob;
    this.fcmToken = student.fcmToken;
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
  }
}
