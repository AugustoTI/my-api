import { Role } from '@roles/entities/role'

// DTO = Data Transfer Object
interface CreateRoleDTO {
  name: string
}

export class RoleRepository {
  private _roles: Role[]
  private static INSTANCE: RoleRepository

  private constructor() {
    this._roles = []
  }

  static getInstance() {
    if (!RoleRepository.INSTANCE) {
      RoleRepository.INSTANCE = new RoleRepository()
      return RoleRepository.INSTANCE
    }

    return RoleRepository.INSTANCE
  }

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
