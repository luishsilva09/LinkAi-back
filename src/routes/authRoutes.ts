import { Router } from "express";
import { schemaValidate } from "../middleware/schemaValidateMiddleware";
import { newUserSchema, signinSchema } from "../schemas/authSchemas";
import * as authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post(
  "/users/signup",
  schemaValidate(newUserSchema),
  authController.signup
);
authRoutes.post(
  "/users/signin",
  schemaValidate(signinSchema),
  authController.signin
);

export default authRoutes;
