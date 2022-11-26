import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

interface UpdateRoleDTO {
  id: string
  name: string
}

export class UpdateRoleUseCase {
  constructor(private _rolesRepository: RoleRepository) {}

  async execute({ id, name }: UpdateRoleDTO) {
    const role = await this._rolesRepository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const roleWithSameName = await this._rolesRepository.findByName(name)

    if (roleWithSameName) {
      throw new AppError('Role name not informed or already in use')
    }

    role.name = name
    return this._rolesRepository.save(role)
  }
}
