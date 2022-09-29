import { prisma } from "../dbStrategy/database";
import { IlinkData } from "../types/linksTypes";

export async function create(linkData: IlinkData, userId: number) {
  await prisma.link.create({ data: { ...linkData, userId, acessCount: 0 } });
}
