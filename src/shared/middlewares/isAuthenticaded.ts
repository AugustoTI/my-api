import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AppError('Failed to verify access token', 401)
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    verify(token, auth.jwt.secret as Secret)
    return next()
  } catch {
    throw new AppError('Invalid authentication token', 401)
  }
}
