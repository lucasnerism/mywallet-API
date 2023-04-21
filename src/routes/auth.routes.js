import { Router } from "express";
import { db } from "../database/database.connection.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signIn } from "../controllers/auth.controller.js";
import { signInSchema } from "../schemas/auth.schema.js";

const authRouter = Router();
authRouter.post("/", validateSchema(signInSchema), signIn);

export default authRouter;