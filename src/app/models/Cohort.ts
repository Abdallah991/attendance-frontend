export class Cohort {
  id: number;
  name: string;
  year: string;
  createdAt: string;
  updatedAt: string;

  constructor(cohort: Cohort) {
    this.id = cohort.id;
    this.name = cohort.name;
    this.year = cohort.year;
    this.createdAt = cohort.createdAt;
    this.updatedAt = cohort.updatedAt;
  }
}
