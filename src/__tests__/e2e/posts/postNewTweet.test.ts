import request from 'supertest';
import { savePostMock } from '../../../infrastructure/mock/posts';

import app from '../../../app';
import { SuccessResponse } from '../../../responses';
import { SavedPost } from '@models/post';

jest.mock('../../../infrastructure/posts', () => ({
  savePost: savePostMock
}));

test('post new tweet', async () => {

  const response = await request(app)
    .post('/posts')
    .send({
      content: 'Hello, event!',
    })
    .expect(200);
  
  const body = response.body as SuccessResponse<SavedPost>
  expect(body.data.content).toBe('Hello, event!');
  expect(body.data.id).toBeDefined();
  expect(body.data.postedAt).toBeDefined();
  expect(body.data.approvedAt).toBeNull();

})