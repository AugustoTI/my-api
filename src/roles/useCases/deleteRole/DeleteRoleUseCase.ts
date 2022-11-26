import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

interface DeleteRoleParams {
  id: string
}

export class DeleteRoleUseCase {
  constructor(private _rolesRepository: RoleRepository) {}

  async execute({ id }: DeleteRoleParams) {
    const role = await this._rolesRepository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    await this._rolesRepository.delete(role)
  }
}
