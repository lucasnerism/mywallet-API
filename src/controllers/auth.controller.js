import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import Joi from "joi";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ userId: user._id, token });
      return res.send({ name: user.name, token, userId: user._id });
    }
    res.sendStatus(401);
  } catch (error) {
    res.sendStatus(500);
  }
}