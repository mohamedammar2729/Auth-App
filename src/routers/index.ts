import { Router } from "express";
import userRouter from "./user";
import validationRouter from "./validation";

const appRouter = Router(); // Create a new router instance


// api/v1/user => userRouter
// api/v1/validation => validationRouter
appRouter.use('/user', userRouter); // Use userRouter for all routes under /user
appRouter.use('/validation', validationRouter); // Use validationRouter for all routes under /validation

export default appRouter;