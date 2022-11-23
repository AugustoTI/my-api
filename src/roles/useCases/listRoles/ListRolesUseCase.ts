import { RoleRepository } from '@roles/repositories/RolesRepository'

export class ListRolesUseCase {
  constructor(private _rolesRepository: RoleRepository) {}

  execute() {
    const roles = this._rolesRepository.findAll()

    return roles
  }
}
