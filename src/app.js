import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));