export class Student {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(student: Student) {
    this.id = student.id;
    this.name = student.name;
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
  }
}
