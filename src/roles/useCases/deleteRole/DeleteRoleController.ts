import { Request, Response } from 'express'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

export class DeleteRoleController {
  constructor(private _deleteRoleUseCase: DeleteRoleUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    await this._deleteRoleUseCase.execute({ id })

    return res.status(204).send()
  }
}
