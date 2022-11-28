import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface ShowRoleParams {
  id: string
}

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private _rolesRepository: RoleRepository,
  ) {}

  async execute({ id }: ShowRoleParams) {
    const role = this._rolesRepository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    return role
  }
}
