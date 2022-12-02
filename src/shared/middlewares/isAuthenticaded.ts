import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
  sub: string
}

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
    const { sub } = verify(token, auth.jwt.secret) as DecodedToken
    req.user = { id: sub }

    return next()
  } catch {
    throw new AppError('Invalid authentication token', 401)
  }
}
