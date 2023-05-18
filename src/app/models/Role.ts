export class Role {
  id: number | string;
  name: string;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
  }
}
