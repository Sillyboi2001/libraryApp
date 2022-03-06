import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import dotenv from 'dotenv';
import app from '../index';

dotenv.config();

const token = process.env.SECRET_KEY;

describe('Post endpoints', () => {
  it('Create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        fileUrl: 'http',
        title: 'The lost boy',
        author: 'SilasManas',
        price: '$10',
        description: 'A boy who lost his way home',
      });
    expect(res.status).toEqual(200);
  });
});
