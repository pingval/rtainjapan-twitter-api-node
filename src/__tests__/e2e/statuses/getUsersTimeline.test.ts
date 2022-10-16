import { listUserTimelineV1Mock } from '../../../repositories/mock/tweets.v1';
import { getUserTimeline } from '@services/twitter.v1'
import request from 'supertest';

import app from '../../../app';
import { ok } from 'neverthrow';

jest.mock('@services/twitter.v1');
jest.mocked(getUserTimeline).mockImplementation(
  async () => Promise.resolve(ok(await listUserTimelineV1Mock()))
);

test('get user\'s timeline', async () => {

  const response = await request(app)
    .get('/statuses/user_timeline');

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    code: 0,
    data: await listUserTimelineV1Mock(),
  });

});
