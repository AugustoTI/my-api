import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [`${__dirname}/../../**/entities/*{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
})
