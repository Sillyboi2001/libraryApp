import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import app from '../index';

describe('Post endpoints', () => {
  it('Should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        username: 'killermine',
        email: 'mike@gmail.com',
        password: 'nekky',
      });
    expect(res.status).toEqual(200);
  });
});

it('Should login a user', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'mike@gmail.com',
      password: 'nekky',
    });
  expect(res.status).toEqual(200);
});

it('User should input his login credentials', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({});
  expect(res.status).toEqual(400);
});

it('should validate a user credentials', async () => {
  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'mike@gmail.com',
      password: 'ninie',
    });
  expect(res.status).toEqual(404);
});
