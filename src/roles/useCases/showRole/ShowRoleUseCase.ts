import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

interface ShowRoleParams {
  id: string
}

export class ShowRoleUseCase {
  constructor(private _rolesRepository: RoleRepository) {}

  async execute({ id }: ShowRoleParams) {
    const role = this._rolesRepository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    return role
  }
}
