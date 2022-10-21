import request from 'supertest';
import app from '@app/index';
import { ok } from 'neverthrow';
import { getUserTimeline } from '@services/twitter';
import { makeTweetFixture } from '__fixtures__/models/twitter';

const timeline = [
  makeTweetFixture({ id: '00000001', text: 'Hello, twitter!'}),
  makeTweetFixture({ id: '00000002', text: 'こんにちは'}),
  makeTweetFixture({ id: '00000003', text: 'よろしくお願いします'}),
]

jest.mock('@services/twitter');
jest.mocked(getUserTimeline).mockImplementation(
  async () => Promise.resolve(ok(timeline))
);

test('get user\'s timeline', async () => {

  const response = await request(app)
    .get('/statuses/user_timeline');

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    code: 0,
    data: timeline,
  });

});
