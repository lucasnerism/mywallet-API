import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

export const db = mongoClient.db();