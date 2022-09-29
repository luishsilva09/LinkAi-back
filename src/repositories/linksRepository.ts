import { prisma } from "../dbStrategy/database";
import { IlinkData } from "../types/linksTypes";

export async function create(linkData: IlinkData, userId: number) {
  await prisma.link.create({ data: { ...linkData, userId, acessCount: 0 } });
}
export async function get(userId: number) {
  return await prisma.link.findMany({
    where: { userId },
    select: { id: true, originalLink: true, tag: true, acessCount: true },
  });
}
