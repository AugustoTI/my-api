import { isAuthenticated } from '@shared/middlewares/isAuthenticaded'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import uploadConfig from '@config/upload'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController'
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)

const upload = multer(uploadConfig)

usersRouter.post(
  '/',
  isAuthenticated,
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
    return createUserController.handle(req, res)
  },
)

usersRouter.get(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  (req, res) => {
    return listUsersController.handle(req, res)
  },
)

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (req, res) => {
    return createLoginController.handle(req, res)
  },
)

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  (req, res) => {
    return updateAvatarController.handle(req, res)
  },
)

usersRouter.get('/profile', isAuthenticated, (req, res) => {
  return showProfileController.handle(req, res)
})

export { usersRouter }
