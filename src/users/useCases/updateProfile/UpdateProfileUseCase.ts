import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@users/repositories/UserRepository'
import { compare, hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface UpdateProfileDTO {
  userId: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    email,
    name,
    password,
    old_password,
  }: UpdateProfileDTO) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email)
    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this email', 400)
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError("Old password doesn't match", 400)
      }

      user.password = await hash(password, 10)
    }

    user.name = name
    user.email = email
    return this.usersRepository.save(user)
  }
}
