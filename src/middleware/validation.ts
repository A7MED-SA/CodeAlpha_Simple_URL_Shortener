import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { HTTP_STATUS } from '../utils/constants.js'
import type { ApiResponse } from '../utils/apiResponse.js'

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message)
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors,
      })
      return
    }

    req.body = result.data
    next()
  }
}
