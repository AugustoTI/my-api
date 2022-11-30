import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/users.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Devs' })
})

routes.use('/roles', rolesRouter)

routes.use('/users', usersRouter)

export { routes }
