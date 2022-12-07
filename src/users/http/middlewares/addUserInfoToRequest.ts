import { NextFunction, Request, Response } from 'express'
import { decode, JwtPayload } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
  sub: string
}

export const addUserInfoToRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  try {
    const { sub } = decode(token) as DecodedToken
    req.user = { id: sub }

    return next()
  } catch {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
}
