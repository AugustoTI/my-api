import { Role } from '@roles/entities/Role'
import { dataSource } from '@shared/typeorm'
import {
  CreateRoleDTO,
  IRoleRepository,
  PaginateParams,
  RolesPaginateProperties,
} from './IRoleRepository'

export class RoleRepository implements IRoleRepository {
  private repository = dataSource.getRepository(Role)

  async create({ name }: CreateRoleDTO) {
    const role = this.repository.create({ name })
    return this.repository.save(role)
  }

  async save(role: Role) {
    return this.repository.save(role)
  }

  async delete(role: Role) {
    await this.repository.remove(role)
  }

  async findByName(name: string) {
    return this.repository.findOneBy({ name })
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id })
  }

  async findAll({ page, skip, take }: PaginateParams) {
    const [roles, count] = await this.repository
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
