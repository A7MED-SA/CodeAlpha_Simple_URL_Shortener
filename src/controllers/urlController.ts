import type { Request, Response } from 'express'
import * as urlService from '../services/urlService.js'
import { successResponse, errorResponse } from '../utils/apiResponse.js'
import { HTTP_STATUS } from '../utils/constants.js'
import type { ApiResponse } from '../utils/apiResponse.js'

export async function createShortUrl(
  req: Request,
  res: Response<ApiResponse>,
) {
  const { url } = req.body as { url: string }
  const result = await urlService.createShortUrl(url)

  res.status(HTTP_STATUS.CREATED).json(
    successResponse(result, 'Short URL created successfully'),
  )
}

export async function redirectToUrl(
  req: Request,
  res: Response,
) {
  const code = req.params['code'] as string
  const url = await urlService.getUrlByCode(code)

  if (!url) {
    res.status(HTTP_STATUS.NOT_FOUND).json(
      errorResponse('Short URL not found'),
    )
    return
  }

  await urlService.trackClick(code)
  res.redirect(301, url.originalUrl)
}

export async function getUrlInfo(
  req: Request,
  res: Response<ApiResponse>,
) {
  const code = req.params['code'] as string
  const info = await urlService.getUrlInfo(code)

  if (!info) {
    res.status(HTTP_STATUS.NOT_FOUND).json(
      errorResponse('Short URL not found'),
    )
    return
  }

  res.json(successResponse(info))
}

export async function deleteUrl(
  req: Request,
  res: Response<ApiResponse>,
) {
  const code = req.params['code'] as string
  const deleted = await urlService.deleteUrl(code)

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json(
      errorResponse('Short URL not found'),
    )
    return
  }

  res.json(successResponse(null, 'Short URL deleted successfully'))
}
