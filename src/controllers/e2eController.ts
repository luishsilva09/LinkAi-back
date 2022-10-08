import { Request, Response } from "express";
import * as e2eService from "../services/e2eService";

export async function resetDatabase(req: Request, res: Response) {
  await e2eService.resetDatabase();
  res.status(200).send();
}
