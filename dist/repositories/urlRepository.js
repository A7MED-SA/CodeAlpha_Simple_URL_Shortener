import { prisma } from '../config/database.js';
export async function create(data) {
    return prisma.url.create({ data });
}
export async function findByShortCode(shortCode) {
    return prisma.url.findUnique({ where: { shortCode } });
}
export async function findByOriginalUrl(originalUrl) {
    return prisma.url.findFirst({ where: { originalUrl } });
}
export async function incrementClicks(shortCode) {
    return prisma.url.update({
        where: { shortCode },
        data: { clicks: { increment: 1 } },
    });
}
export async function remove(shortCode) {
    return prisma.url.delete({ where: { shortCode } });
}
//# sourceMappingURL=urlRepository.js.map