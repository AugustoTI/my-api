import { CreateUserUseCase } from './CreateUserUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserUseCase = container.resolve(CreateUserUseCase)
    const { name, email, password, isAdmin, roleId } = req.body

    const user = await createUserUseCase.execute({
      email,
      isAdmin,
      name,
      password,
      roleId,
    })

    return res.status(201).json(user)
  }
}
