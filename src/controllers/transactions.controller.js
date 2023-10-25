import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";

export async function getTransactions(req, res) {
  const { user } = res.locals;
  try {
    const transaction = await db.collection("transactions").find({ userId: user._id }).toArray();
    res.status(200).send(transaction.reverse());
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function postTransactions(req, res) {
  const { value } = req.body;
  const type = stripHtml(req.body.type).result;
  const description = stripHtml(req.body.description).result;
  const { user } = res.locals;
  try {
    await db.collection("transactions").insertOne({
      userId: user._id,
      date: dayjs().format("DD/MM"),
      type,
      description,
      value
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function deleteTransactions(req, res) {
  const { id } = req.params;
  try {
    const resultDelete = db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
    if (!resultDelete) return res.status(404).send("A operação não existe");
  } catch (error) {
    res.sendStatus(500);
  }
  res.sendStatus(200);
}

export async function putTransactions(req, res) {
  const { value } = req.body;
  const type = stripHtml(req.body.type).result;
  const description = stripHtml(req.body.description).result;
  const { id } = req.params;
  try {
    await db.collection("transactions").updateOne({ _id: new ObjectId(id) }, { $set: { type, description, value } });
  } catch (error) {
    res.sendStatus(500);
  }
  res.sendStatus(200);
}

export async function deleteAllTransactions(req, res) {
  const { user } = res.locals;
  try {
    await db.collection("transactions").deleteMany({ userId: user._id });
  } catch (error) {
    res.sendStatus(500);
  }
  res.sendStatus(200);
}