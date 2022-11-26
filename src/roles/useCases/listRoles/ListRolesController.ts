import { Request, Response } from 'express'
import { ListRolesUseCase } from './ListRolesUseCase'

export class ListRolesController {
  constructor(private _listRolesUseCase: ListRolesUseCase) {}

  async handle(req: Request, res: Response) {
    const page =
      req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1

    const limit =
      req.query.limit && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 15

    const roles = await this._listRolesUseCase.execute({ page, limit })

    return res.status(200).json(roles)
  }
}
