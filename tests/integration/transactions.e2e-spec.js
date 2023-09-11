import supertest from "supertest";
import app from "../../src/app";
import { db, mongoClient } from "../../src/database/database.connection";
import { createUser, logInUser } from "../factories/user.factory";
import { cleanDB } from "../helpers";
import { createTransaction } from "../factories/transaction.factory";

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

afterAll(async () => {
  await mongoClient.close();

});

describe('Transactions e2e Tests', () => {

  describe('POST /transactions', () => {
    it('should return status 401 with invalid token', async () => {
      const transaction = { type: 'in', description: 'test', value: 10 };
      const { status } = await api.post('/transactions').send(transaction);
      expect(status).toEqual(401);
    });

    it('should create a new transaction', async () => {
      const user = await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const token = await logInUser(user.insertedId);
      const transaction = { type: 'in', description: 'test', value: 10 };
      const { status } = await api.post('/transactions').set('Authorization', `Bearer ${token}`).send(transaction);
      expect(status).toEqual(201);
      const transactions = await db.collection('transactions').find().toArray();
      expect(transactions).toHaveLength(1);
    });
  });

  describe('GET /transactions', () => {
    it('should return status 401 with invalid token', async () => {
      const { status } = await api.get('/transactions');
      expect(status).toEqual(401);
    });
    it('should return user transactions', async () => {
      const user = await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const token = await logInUser(user.insertedId);
      const transaction = await createTransaction({ type: 'in', description: 'test', value: 10, userId: user.insertedId });
      const { status, body } = await api.get('/transactions').set('Authorization', `Bearer ${token}`);
      expect(status).toEqual(200);
      expect(JSON.stringify(body)).toEqual(JSON.stringify([transaction]));
    });
  });

  describe('PUT /transactions/:id', () => {
    it('should return status 401 with invalid token', async () => {
      const { status } = await api.put('/transactions');
      expect(status).toEqual(401);
    });
    it('should update user transaction', async () => {
      const user = await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const token = await logInUser(user.insertedId);
      const transaction = await createTransaction({ type: 'in', description: 'test', value: 10, userId: user.insertedId });
      const newTransaction = { type: 'in', description: 'test', value: 20 };
      const { status } = await api.put(`/transactions/${transaction._id}`).set('Authorization', `Bearer ${token}`).send(newTransaction);
      expect(status).toEqual(200);
      const transactions = await db.collection('transactions').find().toArray();
      expect(JSON.stringify(transactions)).toEqual(JSON.stringify([{ ...transaction, value: 20 }]));
    });
  });

  describe('DELETE /transactions/:id', () => {
    it('should return status 401 with invalid token', async () => {
      const { status } = await api.put('/transactions');
      expect(status).toEqual(401);
    });
    it('should delete user transaction', async () => {
      const user = await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const token = await logInUser(user.insertedId);
      const transaction = await createTransaction({ type: 'in', description: 'test', value: 10, userId: user.insertedId });
      const { status } = await api.delete(`/transactions/${transaction._id}`).set('Authorization', `Bearer ${token}`);
      expect(status).toEqual(200);
      const transactions = await db.collection('transactions').find().toArray();
      expect(transactions).toHaveLength(0);
    });
  });
});
