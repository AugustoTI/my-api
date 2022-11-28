import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface DeleteRoleParams {
  id: string
}

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private _rolesRepository: RoleRepository,
  ) {}

  async execute({ id }: DeleteRoleParams) {
    const role = await this._rolesRepository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    await this._rolesRepository.delete(role)
  }
}
