import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/users/signup");
authRoutes.post("/users/signin");

export default authRoutes;
