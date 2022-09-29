import { Request, Response } from "express";
import * as linksService from "../services/linksService";
import decodeToken from "../utils/decodeToken";

export async function create(req: Request, res: Response) {
  const userInfo = decodeToken(req.headers.authorization);
  await linksService.create(req.body, userInfo.id);
  res.status(201).send("Criado com sucesso");
}
export async function get(req: Request, res: Response) {
  res.status(200).send("Links usuario");
}
export async function deleteLink(req: Request, res: Response) {
  res.status(201).send("Deletado com sucesso");
}
