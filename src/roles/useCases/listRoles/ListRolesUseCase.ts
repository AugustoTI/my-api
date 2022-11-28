import { RoleRepository } from '@roles/repositories/RolesRepository'
import { inject, injectable } from 'tsyringe'

interface ListRolesUseCaseParams {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RoleRepository')
    private _rolesRepository: RoleRepository,
  ) {}

  async execute({ limit, page }: ListRolesUseCaseParams) {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this._rolesRepository.findAll({ page, skip, take })
  }
}
