import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import dotenv from 'dotenv';
import app from '../app';
import { userToken, userToken1 } from './user.test';

dotenv.config();

const file = `${__dirname}/filesfolder/test.pdf`;
const file2 = `${__dirname}/filesfolder/download.jpeg`;

describe('Post endpoints', () => {
  it('Block access if no token is passed in', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('content-type', 'multipart/form-data')
      .set('authorization', '')
      .field('title', 'The rich also cry')
      .field('description', 'A story that shows the suffering of the rich')
      .field('author', 'Silasmanas')
      .field('price', '$10')
      .attach('bookFile', file);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'Invalid login' });
  });
});

it('Should block access if an invalid token is passed in', async () => {
  const res = await request(app)
    .post('/api/books')
    .set('content-type', 'multipart/form-data')
    .set('authorization', 'nvffgh')
    .field('title', 'The rich also cry')
    .field('description', 'A story that shows the suffering of the rich')
    .field('author', 'Silasmanas')
    .field('price', '$10')
    .attach('bookFile', file);
  expect(res.status).toEqual(401);
  expect(res.body).toEqual({ message: 'Invalid token' });
});

it('Should create a book', async () => {
  const res = await request(app)
    .post('/api/books')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .field('title', 'The rich also cry')
    .field('description', 'A story that shows the suffering of the rich')
    .field('author', 'Silasmanas')
    .field('price', '$10')
    .attach('bookFile', file);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'Success' });
});

it('Create a book', async () => {
  const res = await request(app)
    .post('/api/books')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .field('title', 'The lion king')
    .field('description', 'A story of a young lion cub')
    .field('author', 'Silasmanas')
    .field('price', '$5')
    .attach('bookFile', file);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'Success' });
});

it('Get all books', async () => {
  const res = await request(app)
    .get('/api/books')
    .set('authorization', userToken.token);
  const { books } = res.body;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ books });
});

it('Get a book by id', async () => {
  const res = await request(app)
    .get('/api/books/1')
    .set('authorization', userToken.token);
  const { item } = res.body;
  expect(res.body).toEqual({ item });
  expect(res.status).toEqual(200);
});

it('modify a book info', async () => {
  const res = await request(app)
    .put('/api/books/1')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .field('title', 'The rich also cry')
    .field('description', 'A story that shows the suffering of the rich')
    .field('author', 'Nicolas')
    .field('price', '$15')
    .attach('bookFile', file);
  const { result } = res.body;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    message: 'Book info updated successfully',
    result,
  });
});

it("Can't modify a book info", async () => {
  const res = await request(app)
    .put('/api/books/1')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .field('title', 'The rich also cry')
    .field('description', 'A story that shows the suffering of the rich')
    .field('author', 'Nicolas')
    .field('price', '$15');
  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Fail to update info' });
});

it('Upload a book cover image', async () => {
  const res = await request(app)
    .put('/api/books/1/imageCover')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .attach('img', file2);
  const { result } = res.body;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    message: 'Success',
    result,
  });
});

it("Can't upload a book cover image when the file is absent", async () => {
  const res = await request(app)
    .put('/api/books/1/imageCover')
    .set('content-type', 'multipart/form-data')
    .set('authorization', userToken.token)
    .field('title', 'The rich also cry')
    .field('description', 'A story that shows the suffering of the rich')
    .field('author', 'Nicolas')
    .field('price', '$15');
  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Fail to upload image' });
});

it('Delete a book by id', async () => {
  const res = await request(app)
    .delete('/api/books/3')
    .set('authorization', userToken.token);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'Book has been deleted successfully' });
});

it('User should rent a book', async () => {
  const res = await request(app)
    .post(`/api/users/${userToken1.userId}/books`)
    .set('authorization', userToken1.token)
    .send({
      id: 2,
    });
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ message: 'This book has been rented successfully' });
});

it('Should check an unavalilable book', async () => {
  const res = await request(app)
    .post(`/api/users/${userToken1.userId}/books`)
    .set('authorization', userToken1.token)
    .send({
      id: 20,
    });
  expect(res.status).toEqual(404);
  expect(res.body).toEqual({ message: 'Book not found' });
});

it("User can't rent a book that has been borrowed", async () => {
  const res = await request(app)
    .post(`/api/users/${userToken.userId}/books`)
    .set('authorization', userToken.token)
    .send({
      id: 2,
    });
  expect(res.status).toEqual(400);
});

it('throw an error if an invalid user id is supplied', async () => {
  const res = await request(app)
    .post('/api/users/5/books')
    .set('authorization', userToken1.token)
    .send({
      id: 2,
    });
  const { err } = res.body;
  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ err });
});

it('Should get all unreturned books by a user', async () => {
  const res = await request(app)
    .get(`/api/users/${userToken1.userId}/books?bookReturned=false`)
    .set('authorization', userToken1.token);
  const { unreturnedBooks } = res.body;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ unreturnedBooks });
});

it('throw an error if an invalid user id is supplied', async () => {
  const res = await request(app)
    .get('/api/users/10/books?bookReturned=false')
    .set('authorization', userToken1.token)
    .send({
      id: 2,
    });
  const { err } = res.body;
  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ err });
});

it('User should return a borrowed book', async () => {
  const res = await request(app)
    .put(`/api/users/${userToken1.userId}/books`)
    .set('authorization', userToken1.token)
    .send({
      bookId: 2,
    });
  const { result } = res.body;
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    message: 'Book has been returned successfully',
    result,
  });
});

it('throw an error if an invalid user id is supplied', async () => {
  const res = await request(app)
    .put('/api/users/6/books')
    .set('authorization', userToken1.token)
    .send({
      id: 2,
    });
  const { err } = res.body;
  expect(res.status).toEqual(500);
  expect(res.body).toEqual({ err });
});
