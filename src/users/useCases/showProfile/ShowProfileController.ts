import { ShowProfileUseCase } from './ShowProfileUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

export class ShowProfileController {
  async handle(req: Request, res: Response) {
    const showProfileUseCase = container.resolve(ShowProfileUseCase)

    const user = await showProfileUseCase.execute({
      userId: req.user.id,
    })

    return res.status(200).json(instanceToInstance(user))
  }
}
