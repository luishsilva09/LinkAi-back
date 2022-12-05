import * as linksRepositories from "../repositories/linksRepository";
import { IlinkData } from "../types/linksTypes";
import { notFoundError, unauthorizedError } from "../utils/errorUtils";
import urlMetadata from "url-metadata";

async function findUser(userId: number) {
  const result = await linksRepositories.findUser(userId);
  if (!result) throw notFoundError("Dados não encontrados");
  return result;
}

export async function create(linkData: IlinkData, userId: number) {
  const MAX_LINKS = 5;
  const userData = await findUser(userId);
  const linksUser = await get(userData.id);

  if (linksUser.length >= MAX_LINKS) {
    throw unauthorizedError("Quantidade maxima de links já foi atingido");
  }

  const previewImage = await urlMetadata(linkData.originalLink).then(
    (result) => {
      return result.image;
    }
  );
  const insertData = {
    ...linkData,
    previewImage,
  };
  return await linksRepositories.create(insertData, userId);
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

export async function viewLinks(urlId: string) {
  const result = await linksRepositories.viewLinks(urlId);
  return result;
}

export async function acessCount(linkId: number) {
  const linkData = await linksRepositories.findLink(linkId);

  if (!linkData) throw notFoundError("Dado não encontrado");

  const result = await linksRepositories.acessCount(linkId);
  return result;
}
