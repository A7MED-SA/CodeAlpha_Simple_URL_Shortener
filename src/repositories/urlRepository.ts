import { prisma } from '../config/database.js'

export interface CreateUrlData {
  originalUrl: string
  shortCode: string
  expiresAt?: Date | null
}

export async function create(data: CreateUrlData) {
  return prisma.url.create({ data })
}

export async function findByShortCode(shortCode: string) {
  return prisma.url.findUnique({ where: { shortCode } })
}

export async function findByOriginalUrl(originalUrl: string) {
  return prisma.url.findFirst({ where: { originalUrl } })
}

export async function incrementClicks(shortCode: string) {
  return prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  })
}

export async function remove(shortCode: string) {
  return prisma.url.delete({ where: { shortCode } })
}
