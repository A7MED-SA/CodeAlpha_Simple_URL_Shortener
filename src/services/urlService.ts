import { env } from '../config/env.js'
import * as urlRepository from '../repositories/urlRepository.js'
import { generateShortCode } from './codeGenerator.js'

export interface CreateUrlResult {
  originalUrl: string
  shortCode: string
  shortUrl: string
}

export async function createShortUrl(originalUrl: string): Promise<CreateUrlResult> {
  const existing = await urlRepository.findByOriginalUrl(originalUrl)
  if (existing) {
    return {
      originalUrl: existing.originalUrl,
      shortCode: existing.shortCode,
      shortUrl: `${env.BASE_URL}/${existing.shortCode}`,
    }
  }

  const shortCode = generateShortCode()

  await urlRepository.create({
    originalUrl,
    shortCode,
  })

  return {
    originalUrl,
    shortCode,
    shortUrl: `${env.BASE_URL}/${shortCode}`,
  }
}

export async function getUrlByCode(shortCode: string) {
  const url = await urlRepository.findByShortCode(shortCode)
  if (!url) return null
  if (url.expiresAt && url.expiresAt < new Date()) return null
  return url
}

export async function trackClick(shortCode: string) {
  return urlRepository.incrementClicks(shortCode)
}

export async function getUrlInfo(shortCode: string) {
  const url = await urlRepository.findByShortCode(shortCode)
  if (!url) return null

  return {
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clicks: url.clicks,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
  }
}

export async function deleteUrl(shortCode: string) {
  const url = await urlRepository.findByShortCode(shortCode)
  if (!url) return false

  await urlRepository.remove(shortCode)
  return true
}
