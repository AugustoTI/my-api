import { Role } from '@roles/entities/role'

// DTO = Data Transfer Object
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

  findByName(name: string) {
    return this._roles.find(role => role.name === name)
  }

  findAll() {
    return this._roles
  }
}
