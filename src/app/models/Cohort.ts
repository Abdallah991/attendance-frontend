export class Cohort {
  id: number;
  name: string;
  year: string;
  school: string;
  createdAt: string;
  updatedAt: string;

  constructor(cohort: Cohort) {
    this.id = cohort.id;
    this.name = cohort.name;
    this.year = cohort.year;
    this.school = cohort.school;
    this.createdAt = cohort.createdAt;
    this.updatedAt = cohort.updatedAt;
  }
}
