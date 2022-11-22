import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

// DTO = Data Transfer Object
interface CreateRoleDTO {
  name: string
}

export class CreateRoleUseCase {
  constructor(private _rolesRepository: RoleRepository) {}

  execute({ name }: CreateRoleDTO) {
    const roleAlreadyExists = this._rolesRepository.findByName(name)

    if (roleAlreadyExists) {
      throw new AppError('Role already exists')
    }

    return this._rolesRepository.create({ name })
  }
}
