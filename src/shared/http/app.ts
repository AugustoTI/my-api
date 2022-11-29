import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'
import { errors } from 'celebrate'
import '@shared/container'

const server = express()

server.use(cors())
server.use(express.json())

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

server.use(routes)
server.use(errors())
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

export { server }
