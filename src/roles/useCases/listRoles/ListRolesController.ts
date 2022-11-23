import { Request, Response } from 'express'
import { ListRolesUseCase } from './ListRolesUseCase'

export class ListRolesController {
  constructor(private _listRolesUseCase: ListRolesUseCase) {}

  handle(req: Request, res: Response) {
    const roles = this._listRolesUseCase.execute()

    return res.status(200).json(roles)
  }
}
