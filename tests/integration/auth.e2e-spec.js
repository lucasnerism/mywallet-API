import supertest from "supertest";
import app from "../../src/app";
import { db, mongoClient } from "../../src/database/database.connection";
import { createUser } from "../factories/user.factory";
import { cleanDB } from "../helpers";

const api = supertest(app);

beforeEach(async () => {
  await cleanDB();
});

afterAll(async () => {
  await mongoClient.close();
});


describe('Auth e2e Test', () => {
  describe('POST /sign-up', () => {
    it('should create a user', async () => {
      const user = { name: 'test', email: 'test@test.com', password: '123456' };
      const { status } = await api.post('/sign-up').send(user);
      expect(status).toEqual(201);
      const users = await db.collection('users').find({ email: user.email }).toArray();
      expect(users).toHaveLength(1);
    });
    it('should return status 409 when email already used', async () => {
      const user = { name: 'test', email: 'test@test.com', password: '123456' };
      await db.collection('users').insertOne({ ...user });
      const { status } = await api.post('/sign-up').send(user);
      expect(status).toEqual(409);
    });
  });

  describe('POST /sign-in', () => {
    it('should return token with right credentials', async () => {
      await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const { status, body } = await api.post('/sign-in').send({ email: 'test@test.com', password: '123456' });
      expect(status).toEqual(200);
      expect(body).toEqual({ token: expect.any(String), name: 'test' });
    });
    it('should return status 401 with wrong email', async () => {
      await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const { status } = await api.post('/sign-in').send({ email: 'test2@test.com', password: '123456' });
      expect(status).toEqual(401);
    });
    it('should return status 401 with wrong password', async () => {
      await createUser({ name: 'test', email: 'test@test.com', password: '123456' });
      const { status } = await api.post('/sign-in').send({ email: 'test@test.com', password: '1234567' });
      expect(status).toEqual(401);
    });
  });
});