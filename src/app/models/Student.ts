import { Cohort } from './Cohort';

export class Student {
  // TODO:
  id: number;
  platformId: string;
  firstName: string;
  lastName: string;
  cohort: Cohort;
  cohortId: number;
  nationality: string;
  phone: string;
  gender: string;
  supportedByTamkeen: string;
  acadamicQualification: string;
  acadamicSpecialization: string;
  scholarship: string;
  password: string;
  email: string;
  dob: string | Date;
  fcmToken: string;
  createdAt: string;
  updatedAt: string;

  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.cohort = student.cohort;
    this.cohortId = student.cohortId;
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
    this.platformId = student.platformId;
    this.acadamicQualification = student.acadamicQualification;
    this.acadamicSpecialization = student.acadamicSpecialization;
  }
}
