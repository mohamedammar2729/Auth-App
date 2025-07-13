import { Router } from "express";
import { validateAuthMiddleware } from "../middleware/auth.middleware";

const validationRouter = Router(); // Create a new router instance
validationRouter.put('/tokens', validateAuthMiddleware);


export default validationRouter;