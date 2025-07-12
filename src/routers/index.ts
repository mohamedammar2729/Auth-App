import { Router } from "express";
import userRouter from "./user";
import validationRouter from "./validation";

const appRouter = Router(); // Create a new router instance


// api/user => userRouter
// api/validation => validationRouter
appRouter.use('/user', userRouter); // Use userRouter for all routes under /user
appRouter.use('/validation', validationRouter); // Use validationRouter for all routes under /validation

export default appRouter;