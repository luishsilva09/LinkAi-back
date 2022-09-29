import * as linksRepositories from "../repositories/linksRepository";
import { IlinkData } from "../types/linksTypes";

export async function create(linkData: IlinkData, userId: number) {
  await linksRepositories.create(linkData, userId);
}
