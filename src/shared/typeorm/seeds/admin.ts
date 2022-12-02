import { hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { dataSource } from '..'

export const create = async () => {
  const connection = await dataSource.initialize()
  const roleId = uuidv4()
  // Create Role
  await connection.query(`
    INSERT INTO roles(id, name)
    values('${roleId}', 'T.I')
  `)
  // Create User
  const userId = uuidv4()
  const password = await hash('1234', 10)
  await connection.query(`
    INSERT INTO users(id, name, email, password, "isAdmin", roleId)
    values('${userId}', 'admin', 'a@a.com', '${password}', true, '${roleId}')
  `)
  await connection.destroy()
}

create()
