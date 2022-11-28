import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowRoleUseCase } from './ShowRoleUseCase'

export class ShowRoleController {
  async handle(req: Request, res: Response) {
    const showRoleUseCase = await container.resolve(ShowRoleUseCase)
    const { id } = req.params
    const role = await showRoleUseCase.execute({ id })

    return res.status(200).json(role)
  }
}
