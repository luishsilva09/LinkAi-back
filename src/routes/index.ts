import { Router } from "express";
import authRoutes from "./authRoutes";
import e2eRoutes from "./e2eRoutes";
import linksRoute from "./linksRoutes";
import dotenv from "dotenv";
dotenv.config();

const routes = Router();
routes.use(authRoutes);
routes.use(linksRoute);
if (process.env.NODE_ENV === "test") {
  console.log("oii");
  routes.use(e2eRoutes);
}

export default routes;
