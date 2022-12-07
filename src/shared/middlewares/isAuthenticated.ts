import auth from '@config/auth'
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
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Failed to verify access token',
    })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const { sub } = verify(token, auth.jwt.secret) as DecodedToken
    req.user = { id: sub }

    return next()
  } catch {
    return res.status(401).json({
      error: true,
      code: 'token.expired',
      message: 'Invalid authentication token',
    })
  }
}
