import { Router } from "express";
import * as linksController from "../controllers/linksControllers";
import { schemaValidate } from "../middleware/schemaValidateMiddleware";
import validToken from "../middleware/validToken";
import { linkData } from "../schemas/linksSchemas";

const linksRoute = Router();

linksRoute.post(
  "/links/create",
  validToken,
  schemaValidate(linkData),
  linksController.create
);
linksRoute.get("/links", validToken, linksController.get);
linksRoute.delete("/links/:linkId", validToken, linksController.deleteLink);
linksRoute.get("/links/view/:userId", linksController.viewLinks);

export default linksRoute;
