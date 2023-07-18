import 'reflect-metadata'
import 'dotenv/config'
import { dataSource } from '@shared/typeorm'
import { server } from './app'

dataSource
  .initialize()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
