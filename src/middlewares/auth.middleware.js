import { db } from "../database/database.connection.js";
export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const session = await db.collection("sessions").findOne({ token });

  if (!token) return res.sendStatus(401);

  res.locals.session = session;

  next();
}