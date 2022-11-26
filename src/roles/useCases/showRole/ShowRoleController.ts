import { Request, Response } from 'express'

export class ShowRoleController {
  constructor(private _showRoleUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params
    const role = await this._showRoleUseCase.execute({ id })

    return res.status(200).json(role)
  }
}
