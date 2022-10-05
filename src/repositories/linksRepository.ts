import { prisma } from "../dbStrategy/database";
import { IinsertLink, IlinkData } from "../types/linksTypes";

export async function findUser(userId: number) {
  return await prisma.user.findUnique({ where: { id: userId } });
}
export async function findLink(linkId: number) {
  return await prisma.link.findUnique({ where: { id: linkId } });
}

export async function create(linkData: IinsertLink, userId: number) {
  return await prisma.link.create({
    data: { ...linkData, userId, acessCount: 0 },
  });
}
export async function get(userId: number) {
  return await prisma.link.findMany({
    where: { userId },
    select: {
      id: true,
      originalLink: true,
      tag: true,
      acessCount: true,
      previewImage: true,
    },
  });
}

export async function deleteLink(linkId: number) {
  await prisma.link.delete({ where: { id: linkId } });
}

export async function viewLinks(urlId: string) {
  return await prisma.user.findUnique({
    where: {
      urlId: urlId,
    },
    select: {
      name: true,
      imageUrl: true,
      links: {
        select: {
          id: true,
          originalLink: true,
          tag: true,
          previewImage: true,
        },
      },
    },
  });
}
