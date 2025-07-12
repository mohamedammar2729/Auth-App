import { Router } from "express";
import { registerUser, getUser, loginUser } from '../handlers/user-handler';

const userRouter = Router(); // Create a new router instance

// Define routes for user-related operations
// api/v1/user/:id means get user by id => specific user route
userRouter.get('/:id', getUser);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
export default userRouter;