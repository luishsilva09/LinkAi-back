import * as linksRepositories from "../repositories/linksRepository";
import { IlinkData } from "../types/linksTypes";
import { notFoundError } from "../utils/errorUtils";

async function findUser(userId: number) {
  const result = await linksRepositories.findUser(userId);
  if (!result) throw notFoundError("Dados não encontrados");
}

export async function create(linkData: IlinkData, userId: number) {
  await findUser(userId);
  await linksRepositories.create(linkData, userId);
}

export async function get(userId: number) {
  await findUser(userId);
  return await linksRepositories.get(userId);
}
