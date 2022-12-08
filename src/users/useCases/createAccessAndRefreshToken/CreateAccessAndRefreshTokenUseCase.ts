import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { RefreshTokenRepository } from '@users/repositories/RefreshTokenRepository'
import { UsersRepository } from '@users/repositories/UserRepository'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface CreateAccessAndRefreshTokenDTO {
  user_id: string
  refresh_token: string
}

interface IResponse {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
export class CreateAccessAndRefreshTokenUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute({
    refresh_token,
    user_id,
  }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const refreshTokenExists = await this.refreshTokenRepository.findByToken(
      refresh_token,
    )
    if (!refreshTokenExists) {
      throw new AppError('Refresh token is required', 401)
    }

    const dateNow = new Date().getTime()
    if (
      !refreshTokenExists.valid ||
      refreshTokenExists.expires.getTime() < dateNow
    ) {
      throw new AppError('Refresh token is invalid/expired', 401)
    }

    await this.refreshTokenRepository.invalidate(refreshTokenExists)

    const accessToken = sign({}, auth.jwt.secret, {
      expiresIn: auth.jwt.expiresIn,
      subject: user.id,
    })

    const expires = new Date(Date.now() + auth.refreshToken.duration)
    const refreshToken = sign({}, auth.refreshToken.secret, {
      expiresIn: auth.refreshToken.expiresIn,
      subject: user.id,
    })

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
