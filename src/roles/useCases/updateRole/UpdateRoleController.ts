import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

export class UpdateRoleController {
  async handle(req: Request, res: Response) {
    const updateRoleUseCase = await container.resolve(UpdateRoleUseCase)
    const { id } = req.params
    const { name } = req.body
    const role = await updateRoleUseCase.execute({ id, name })

    return res.status(200).json(role)
  }
}
