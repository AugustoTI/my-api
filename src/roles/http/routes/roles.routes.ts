import { Router } from 'express'
import { v4 as uuidV4 } from 'uuid'

const rolesRouter = Router()

const roles = []

rolesRouter.post('/', (req, res) => {
  const { name } = req.body
  const role = {
    id: uuidV4(),
    name,
    created_at: new Date(),
  }

  roles.push(role)

  return res.status(201).json({ role })
})

export { rolesRouter }
