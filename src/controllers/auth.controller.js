import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { password } = req.body;
  const { user } = res.locals;
  try {
    if (!user) res.status(404).send("E-mail ou senha incorretos.");
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ userId: user._id, token });
      return res.status(200).send({ name: user.name, token });
    }
    res.status(401).send("E-mail ou senha incorretos.");
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const { password } = req.body;
  const name = stripHtml(req.body.name).result;
  const email = stripHtml(req.body.email).result;
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