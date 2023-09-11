import * as bcrypt from "bcrypt";
import { db } from "../../src/database/database.connection";
import { v4 as uuid } from "uuid";

export async function createUser(user) {

  return db.collection('users').insertOne({ ...user, password: bcrypt.hashSync(user.password, 10) });
}

export async function logInUser(userId) {
  const token = uuid();
  await db.collection("sessions").insertOne({ userId, token });
  return token;
}