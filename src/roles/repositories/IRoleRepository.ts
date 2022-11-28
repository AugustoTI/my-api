import { Role } from '@roles/entities/role'

// DTO = Data Transfer Object
export interface CreateRoleDTO {
  name: string
}

export interface PaginateParams {
  page: number
  skip: number
  take: number
}

export interface RolesPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export interface IRoleRepository {
  create(data: CreateRoleDTO): Promise<Role>
  save(role: Role): Promise<Role>
  findAll(params: PaginateParams): Promise<RolesPaginateProperties>
  findById(id: string): Promise<Role | null>
  findByName(name: string): Promise<Role | null>
  delete(role: Role): Promise<void>
}
