import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRolerController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController'
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'

const rolesRouter = Router()
const createRoleController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const showRoleController = container.resolve(ShowRoleController)
const deleteRoleController = container.resolve(DeleteRoleController)
const updateRoleController = container.resolve(UpdateRoleController)

rolesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listRolesController.handle(req, res)
  },
)

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createRoleController.handle(req, res)
  },
)

rolesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return showRoleController.handle(req, res)
  },
)

rolesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return updateRoleController.handle(req, res)
  },
)

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return deleteRoleController.handle(req, res)
  },
)

export { rolesRouter }
