import { Router } from "express";
import { registerUser, getUser, loginUser, getUserById } from '../handlers/user-handler';
import { validateAuthTokens } from "../middleware/jwt-token-validator";

const userRouter = Router(); // Create a new router instance

// Define routes for user-related operations
// api/v1/user/:id means get user by id => specific user route
userRouter.get('/me', validateAuthTokens, getUser);
userRouter.get('/:id', getUserById);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
export default userRouter;