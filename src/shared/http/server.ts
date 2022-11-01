import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { routes } from './routes'

const server = express()

server.use(cors())
server.use(express.json())

server.use(routes)

server.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
