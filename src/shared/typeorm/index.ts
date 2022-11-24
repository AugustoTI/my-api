import { DataSource } from 'typeorm'
import { CreateRolesTable1669314656111 } from './migrations/1669314656111-CreateRolesTable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [CreateRolesTable1669314656111],
})
