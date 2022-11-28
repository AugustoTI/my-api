import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRoleUseCase } from './CreateRolerUseCase'

export class CreateRoleController {
  async handle(req: Request, res: Response) {
    const createRoleUseCase = container.resolve(CreateRoleUseCase)
    const { name } = req.body

    const role = await createRoleUseCase.execute({ name })

    return res.status(201).json(role)
  }
}
