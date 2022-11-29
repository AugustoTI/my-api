import { Role } from '@roles/entities/role'
import { User } from '@users/entitties/User'
import { resolve } from 'path'
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [resolve(__dirname, 'migrations', '*.{ts,js}')],
})
