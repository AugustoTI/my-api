import { RoleRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@users/repositories/UserRepository'
import { inject, injectable } from 'tsyringe'

interface ShowProfileParams {
  userId: string
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RolesRepository') private rolesRepository: RoleRepository,
  ) {}

  async execute({ userId }: ShowProfileParams) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
