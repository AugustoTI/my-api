import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { RefreshTokenRepository } from '@users/repositories/RefreshTokenRepository'
import { UsersRepository } from '@users/repositories/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface CreateLoginDTO {
  email: string
  password: string
}

interface IResponse {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const accessToken = sign({}, auth.jwt.secret, {
      expiresIn: auth.jwt.expiresIn,
      subject: user.id,
    })

    const refreshToken = sign({}, auth.refreshToken.secret, {
      expiresIn: auth.refreshToken.expiresIn,
      subject: user.id,
    })

    const expires = new Date(Date.now() + auth.refreshToken.duration)

    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      user_id: user.id,
      valid: true,
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}
