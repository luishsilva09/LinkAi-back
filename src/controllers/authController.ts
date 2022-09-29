import { Request, Response } from "express";
import * as authService from "../services/authService";
import { unauthorizedError } from "../utils/errorUtils";

export async function signup(req: Request, res: Response) {
  await authService.signup(req.body);
  res.status(201).send("Criado com sucesso");
}

export async function signin(req: Request, res: Response) {
  const token = await authService.signin(req.body);
  res.status(200).send(token);
}
