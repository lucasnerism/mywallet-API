import dayjs from "dayjs";
import { db } from "../../src/database/database.connection";

export async function createTransaction({ userId, type, description, value }) {
  await db.collection("transactions").insertOne({
    userId,
    date: dayjs().format("DD/MM"),
    type,
    description,
    value
  });
  const transaction = await db.collection('transactions').find({ userId }).toArray();
  return transaction[0];
}
