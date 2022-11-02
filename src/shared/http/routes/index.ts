import { rolesRouter } from '@roles/http/routes/roles.routes'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Devs' })
})

routes.use('/roles', rolesRouter)

export { routes }
