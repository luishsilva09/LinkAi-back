import { prisma } from "../dbStrategy/database";
import { IinserData } from "../types/authTypes";

export async function find(email: string) {
  const result = await prisma.user.findUnique({ where: { email } });
  return result;
}

export async function create(userData: IinserData) {
  await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      urlId: userData.urlId,
    },
  });
}
