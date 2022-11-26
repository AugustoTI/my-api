import { Request, Response } from 'express'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

export class UpdateRoleController {
  constructor(private _updateRoleUseCase: UpdateRoleUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { name } = req.body
    const role = await this._updateRoleUseCase.execute({ id, name })

    return res.status(200).json(role)
  }
}
