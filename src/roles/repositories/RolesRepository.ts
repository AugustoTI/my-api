import { Role } from '@roles/entities/role'

interface CreateRoleDTO {
  name: string
}

export class RoleRepository {
  private _roles: Role[] = []

  create({ name }: CreateRoleDTO) {
    const role = new Role()

    Object.assign(role, { name, created_at: new Date() })

    this._roles.push(role)

    return role
  }

  findAll() {
    return this._roles
  }
}
