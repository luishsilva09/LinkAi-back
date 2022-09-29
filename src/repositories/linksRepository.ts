import { prisma } from "../dbStrategy/database";
import { IlinkData } from "../types/linksTypes";

export async function findUser(userId: number) {
  return await prisma.user.findUnique({ where: { id: userId } });
}
export async function findLink(linkId: number) {
  return await prisma.link.findUnique({ where: { id: linkId } });
}

export async function create(linkData: IlinkData, userId: number) {
  await prisma.link.create({ data: { ...linkData, userId, acessCount: 0 } });
}
export async function get(userId: number) {
  return await prisma.link.findMany({
    where: { userId },
    select: { id: true, originalLink: true, tag: true, acessCount: true },
  });
}

export async function deleteLink(linkId: number) {
  await prisma.link.delete({ where: { id: linkId } });
}

export async function viewLinks(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      links: {
        select: {
          id: true,
          originalLink: true,
          tag: true,
        },
      },
    },
  });
}
