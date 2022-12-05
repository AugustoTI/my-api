import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from './UpdateAvatarUseCase'

export class UpdateAvatarController {
  async handle(req: Request, res: Response) {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)

    const user = await updateAvatarUseCase.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    })

    return res.status(201).json(instanceToInstance(user))
  }
}
