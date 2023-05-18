export class Permission {
  id: number | string;
  name: string;
  access: string;

  constructor(permission: Permission) {
    this.id = permission.id;
    this.name = permission.name;
    this.access = permission.access;
  }
}
