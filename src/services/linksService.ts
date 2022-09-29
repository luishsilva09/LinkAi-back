import * as linksRepositories from "../repositories/linksRepository";
import { IlinkData } from "../types/linksTypes";
import { notFoundError, unauthorizedError } from "../utils/errorUtils";

async function findUser(userId: number) {
  const result = await linksRepositories.findUser(userId);
  if (!result) throw notFoundError("Dados não encontrados");
  return result;
}

export async function create(linkData: IlinkData, userId: number) {
  await findUser(userId);
  await linksRepositories.create(linkData, userId);
}

export async function get(userId: number) {
  await findUser(userId);
  return await linksRepositories.get(userId);
}

export async function deleteLink(linkId: number, userId: number) {
  const linkData = await linksRepositories.findLink(linkId);

  if (!linkData) throw notFoundError("Dado não encontrado");
  if (linkData.userId !== userId)
    throw unauthorizedError("Você não possui permissão para executar");

  await linksRepositories.deleteLink(linkId);
}
