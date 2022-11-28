import { Role } from '@roles/entities/role'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'
import {
  CreateRoleDTO,
  IRoleRepository,
  PaginateParams,
  RolesPaginateProperties,
} from './IRoleRepository'

export class RoleRepository implements IRoleRepository {
  private _repository: Repository<Role>

  constructor() {
    this._repository = dataSource.getRepository(Role)
  }

  async create({ name }: CreateRoleDTO) {
    const role = this._repository.create({ name })
    return this._repository.save(role)
  }

  async save(role: Role) {
    return this._repository.save(role)
  }

  async delete(role: Role) {
    await this._repository.remove(role)
  }

  async findByName(name: string) {
    return this._repository.findOneBy({ name })
  }

  async findById(id: string) {
    return this._repository.findOneBy({ id })
  }

  async findAll({ page, skip, take }: PaginateParams) {
    const [roles, count] = await this._repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result: RolesPaginateProperties = {
      current_page: page,
      per_page: take,
      data: roles,
      total: count,
    }

    return result
  }
}
