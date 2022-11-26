import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRolerUseCase'

export class CreateRoleController {
  constructor(private _createRoleUseCase: CreateRoleUseCase) {}

  async handle(req: Request, res: Response) {
    const { name } = req.body

    const role = await this._createRoleUseCase.execute({ name })

    return res.status(201).json(role)
  }
}
