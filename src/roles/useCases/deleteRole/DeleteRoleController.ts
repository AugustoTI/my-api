import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

export class DeleteRoleController {
  async handle(req: Request, res: Response) {
    const deleteRoleUseCase = await container.resolve(DeleteRoleUseCase)
    const { id } = req.params

    deleteRoleUseCase.execute({ id })

    return res.status(204).send()
  }
}
