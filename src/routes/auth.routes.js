import { Router } from "express";
import { db } from "../database/database.connection.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { userValidation } from "../middlewares/auth.middleware.js";

const authRouter = Router();
authRouter.post("/sign-in", validateSchema(signInSchema), userValidation, signIn);
authRouter.post("/sign-up", validateSchema(signUpSchema), userValidation, signUp);

export default authRouter;