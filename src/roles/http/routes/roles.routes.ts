import { createRoleController } from '@roles/useCases/createRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.get('/', (req, res) => {
  return listRolesController.handle(req, res)
})

rolesRouter.post('/', (req, res) => {
  return createRoleController.handle(req, res)
})

export { rolesRouter }
