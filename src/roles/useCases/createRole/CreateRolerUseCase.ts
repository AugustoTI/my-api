import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

// DTO = Data Transfer Object
interface CreateRoleDTO {
  name: string
}

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private _rolesRepository: RoleRepository,
  ) {}

  async execute({ name }: CreateRoleDTO) {
    const roleAlreadyExists = await this._rolesRepository.findByName(name)

    if (roleAlreadyExists) {
      throw new AppError('Role already exists')
    }

    return this._rolesRepository.create({ name })
  }
}
