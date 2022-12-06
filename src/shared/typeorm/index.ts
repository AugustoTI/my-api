import { resolve } from 'path'
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [resolve('src', '**', 'entities', '*.{ts,js}')],
  migrations: [resolve(__dirname, 'migrations', '*.{ts,js}')],
})
