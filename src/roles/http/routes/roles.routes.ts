import { RoleRepository } from '@roles/repositories/RolesRepository'
import { createRoleController } from '@roles/useCases/createRole'
import { Router } from 'express'

const rolesRouter = Router()
const rolesRepository = new RoleRepository()

rolesRouter.get('/', (req, res) => {
  const roles = rolesRepository.findAll()

  return res.status(200).json(roles)
})

rolesRouter.post('/', (req, res) => {
  return createRoleController.handle(req, res)
})

export { rolesRouter }
