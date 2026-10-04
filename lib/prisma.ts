// Prisma Client Singleton helper
let prismaInstance: any;

try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = global as unknown as { prisma: any };
  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error"],
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
} catch (e) {
  prismaInstance = null;
}

export const prisma = prismaInstance;
export default prisma;
