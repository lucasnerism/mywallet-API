import { db } from "../src/database/database.connection";

export async function cleanDB() {
  await db.collection('users').deleteMany({});
  await db.collection('sessions').deleteMany({});
  await db.collection('transactions').deleteMany({});
}