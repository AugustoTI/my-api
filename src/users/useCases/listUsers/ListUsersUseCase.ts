import { UsersRepository } from '@users/repositories/UserRepository'
import { inject, injectable } from 'tsyringe'

interface ListUsersUseCaseParams {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({ limit, page }: ListUsersUseCaseParams) {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.usersRepository.findAll({ page, skip, take })
  }
}
