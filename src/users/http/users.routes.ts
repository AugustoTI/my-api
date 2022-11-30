import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    },
  }),
  (req, res) => {
    createUserController.handle(req, res)
  },
)

export { usersRouter }
