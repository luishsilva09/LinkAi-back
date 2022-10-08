import { Router } from "express";
import * as e2eController from "../controllers/e2eController";

const e2eRoutes = Router();

e2eRoutes.post("/reset-database", e2eController.resetDatabase);

export default e2eRoutes;
