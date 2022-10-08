import { prisma } from "../dbStrategy/database";

export async function resetDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
}
