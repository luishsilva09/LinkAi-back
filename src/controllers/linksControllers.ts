import { Request, Response } from "express";
import { request } from "http";
import * as linksService from "../services/linksService";
import decodeToken from "../utils/decodeToken";

export async function create(req: Request, res: Response) {
  const userInfo = decodeToken(req.headers.authorization);
  const result = await linksService.create(req.body, userInfo.id);
  res.status(201).send(result);
}
export async function get(req: Request, res: Response) {
  const userInfo = decodeToken(req.headers.authorization);
  const result = await linksService.get(userInfo.id);
  res.status(200).send(result);
}
export async function deleteLink(req: Request, res: Response) {
  const userInfo = decodeToken(req.headers.authorization);
  const linkId: number = Number(req.params.linkId);
  await linksService.deleteLink(linkId, userInfo.id);
  res.status(200).send("Deletado com sucesso");
}
export async function viewLinks(req: Request, res: Response) {
  const urlId: string = String(req.params.urlId);

  const result = await linksService.viewLinks(urlId);
  res.status(200).send(result);
}
export async function acessCount(req: Request, res: Response) {
  const linkId: number = Number(req.params.linkId);
  const result = await linksService.acessCount(linkId);

  res.status(200).send(result);
}
