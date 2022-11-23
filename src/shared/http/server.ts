import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'

const server = express()

server.use(cors())
server.use(express.json())

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

server.use(routes)
server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.status)
      .json({ status: 'error', message: error.message })
  }

  console.log(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal error server',
  })
})

server.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
