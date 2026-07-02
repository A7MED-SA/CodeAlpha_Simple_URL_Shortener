import type { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '../utils/constants.js'
import type { ApiResponse } from '../utils/apiResponse.js'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
) {
  console.error('Unhandled error:', err)

  const statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = process.env['NODE_ENV'] === 'production'
    ? 'Internal server error'
    : err.message

  res.status(statusCode).json({
    success: false,
    message,
  })
}
