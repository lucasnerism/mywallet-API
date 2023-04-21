import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { password } = req.body;
  const { user } = res.locals;
  try {
    if (!user) res.sendStatus(404);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ userId: user._id, token });
      return res.send({ name: user.name, token });
    }
    res.status(401).send("E-mail ou senha incorretos.");
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const { name, password, email } = req.body;
  const { user } = res.locals;

  try {
    if (user) return res.status(409).send("Já existe uma conta com esse email.");
    const passwordHash = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({ name, email, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}