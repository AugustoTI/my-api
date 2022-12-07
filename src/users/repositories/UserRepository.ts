import { dataSource } from '@shared/typeorm'
import { User } from '@users/entities/User'
import {
  CreateUserDTO,
  IUsersRepository,
  PaginateParams,
  UsersPaginateProperties,
} from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository = dataSource.getRepository(User)

  async create(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create(data)

    return this.repository.save(user)
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties> {
    const [users, count] = await this.repository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.role', 'role')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result: UsersPaginateProperties = {
      current_page: page,
      per_page: take,
      data: users,
      total: count,
    }

    return result
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }
}
