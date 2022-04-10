import { Response } from 'express';
import request from 'supertest';
import { savePostMock } from '../../../repositories/mock/posts';
import { createNewPost } from '../../../services/posts';

const app = require('../../../app');

jest.mock('../../../repositories/posts', () => ({
  savePost: savePostMock
}));

test('post new tweet', async () => {

  const response = await request(app)
    .post('/posts')
    .send({
      content: 'Hello, event!',
    })
    .expect(200);

  expect(response.body.data.content).toBe('Hello, event!');
  expect(response.body.data.id).toBeDefined();
  expect(response.body.data.postedAt).toBeDefined();
  expect(response.body.data.approvedAt).toBeNull();

})