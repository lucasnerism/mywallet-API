import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { deleteTransactions, getTransactions, postTransactions, putTransactions } from "../controllers/transactions.controller.js";
import { transactionSchema } from "../schemas/transactions.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";


const transactionsRouter = Router();
transactionsRouter.use(authValidation);

transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.post("/transactions", validateSchema(transactionSchema), postTransactions);
transactionsRouter.delete("/transactions/:id", deleteTransactions);
transactionsRouter.put("/transactions/:id", validateSchema(transactionSchema), putTransactions);

export default transactionsRouter;