import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '@users/repositories/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface CreateLoginDTO {
  email: string
  password: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const token = sign({ email, password }, auth.jwt.secret, {
      expiresIn: auth.jwt.expiresIn,
      subject: user.id,
    })

    return {
      user,
      token,
    }
  }
}
