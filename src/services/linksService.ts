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
  await findUser(userId);
  const previewImage = await urlMetadata(linkData.originalLink).then(
    (result) => {
      return result.image;
    }
  );
  const insertData = {
    ...linkData,
    previewImage,
  };
  await linksRepositories.create(insertData, userId);
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
  console.log(result);
  return result;
}
