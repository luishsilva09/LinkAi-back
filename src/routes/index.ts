import { Router } from "express";
import authRoutes from "./authRoutes";
import linksRoute from "./linksRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(linksRoute);

export default routes;
