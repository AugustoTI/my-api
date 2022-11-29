import { Role } from '@roles/entities/role'
import { User } from '@users/entitties/User'

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  isAdmin: boolean
  role: Role
}

export interface PaginateParams {
  page: number
  skip: number
  take: number
}

export interface UsersPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: User[]
}

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>
  save(user: User): Promise<User>
  findAll(params: PaginateParams): Promise<UsersPaginateProperties>
  findById(id: string): Promise<User | null>
  findByName(name: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(user: User): Promise<void>
}
