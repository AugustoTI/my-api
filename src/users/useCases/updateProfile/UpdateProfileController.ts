import { UpdateProfileUseCase } from './UpdateProfileUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

export class UpdateProfileController {
  async handle(req: Request, res: Response) {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase)
    const { name, email, password, old_password } = req.body

    const user = await updateProfileUseCase.execute({
      userId: req.user.id,
      email,
      name,
      password,
      old_password,
    })

    return res.status(201).json(instanceToInstance(user))
  }
}
