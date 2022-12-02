import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from './CreateLoginUseCase'

export class CreateLoginController {
  async handle(req: Request, res: Response) {
    const createUserUseCase = container.resolve(CreateLoginUseCase)
    const { email, password } = req.body

    const { token, user } = await createUserUseCase.execute({
      email,
      password,
    })

    return res.status(201).json(instanceToInstance({ token, user }))
  }
}
