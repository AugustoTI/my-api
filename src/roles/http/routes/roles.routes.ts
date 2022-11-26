import { createRoleController } from '@roles/useCases/createRole'
import { deleteRoleController } from '@roles/useCases/deleteRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRoleController } from '@roles/useCases/showRole'
import { updateRoleController } from '@roles/useCases/updateRole'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.get('/', (req, res) => {
  return listRolesController.handle(req, res)
})

rolesRouter.post('/', (req, res) => {
  return createRoleController.handle(req, res)
})

rolesRouter.get('/:id', (req, res) => {
  return showRoleController.handle(req, res)
})

rolesRouter.put('/:id', (req, res) => {
  return updateRoleController.handle(req, res)
})

rolesRouter.delete('/:id', (req, res) => {
  return deleteRoleController.handle(req, res)
})

export { rolesRouter }
