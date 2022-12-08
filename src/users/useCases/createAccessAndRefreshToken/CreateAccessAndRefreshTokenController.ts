import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAccessAndRefreshTokenUseCase } from './CreateAccessAndRefreshTokenUseCase'

export class CreateAccessAndRefreshTokenController {
  async handle(req: Request, res: Response) {
    const createAccessAndRefreshTokenUseCase = container.resolve(
      CreateAccessAndRefreshTokenUseCase,
    )

    const user_id = req.user.id
    const { refresh_token } = req.body

    const { accessToken, refreshToken, user } =
      await createAccessAndRefreshTokenUseCase.execute({
        user_id,
        refresh_token,
      })

    return res
      .status(201)
      .json(instanceToInstance({ user, accessToken, refreshToken }))
  }
}
