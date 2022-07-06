import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';
import app from '../../app';

export const userToken = {};
export const userToken1 = {};

describe('Post endpoints', () => {
  it('Should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        username: 'killermine',
        email: 'mike@gmail.com',
        password: 'nekky',
      })
    const { token } = res.body;
    userToken.token = token;
    userToken.userId = jwt.decode(userToken.token).id;
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: expect.any(String),
      token,
    })
  });
});

it('Should create a new user', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      username: 'Kindness',
      email: 'kindness@gmail.com',
      password: 'nekky',
    });
  const { token } = res.body;
  userToken1.token = token;
  userToken1.userId = jwt.decode(userToken1.token).id;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    message: expect.any(String),
    token,
  });
});

it('Should check if a user exists', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      username: 'killermine',
      email: 'mike@gmail.com',
      password: 'nekky',
    });
  expect(res.status).toEqual(409);
  expect(res.body).toEqual({ message: expect.any(String), });
});

it('Should throw an error if input is empty', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({});
  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ message: expect.any(String), });
});

it('Should login a user', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'mike@gmail.com',
      password: 'nekky',
    });
  const { token } = res.body;
  userToken.token = token;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    message: expect.any(String),
    token,
  });
});

it('User should input his login credentials', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({});
  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: expect.any(String) });
});

it('should validate a user credentials', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'mike@gmail.com',
      password: 'ninie',
    });
  expect(res.status).toEqual(404);
  expect(res.body).toEqual({ message: expect.any(String) });
});

it("should return an error message when a user doesn't exist", async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'nna@gmail.com',
      password: 'minny',
    });
  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ message: expect.any(String) });
});
