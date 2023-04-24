import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });

  if (!session) return res.sendStatus(401);

  const user = await db.collection("users").findOne({ _id: session.userId });

  res.locals.user = user;

  next();
}

export async function userValidation(req, res, next) {
  const { email } = req.body;
  const user = await db.collection("users").findOne({ email });
  res.locals.user = user;

  next();
}