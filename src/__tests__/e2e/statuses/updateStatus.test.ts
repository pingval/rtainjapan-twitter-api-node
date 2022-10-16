
import * as Twitter from '@models/twitter';
import { getUserTimeline, tweet } from '@services/twitter.v1';
import request from 'supertest';
import { listUserTimelineV1Mock } from '../../../repositories/mock/tweets.v1';
import { ok } from 'neverthrow';

import app from '../../../app';

jest.mock('@services/twitter.v1');
jest.mocked(getUserTimeline).mockImplementation(
  async () => Promise.resolve(ok(await listUserTimelineV1Mock()))
);
const mockedTweet = jest.mocked(tweet).mockImplementation(
  (post) => Promise.resolve(ok(post))
);

test('update tweet status.', async () => {

  const data = {
    status: "走者乙ｗｗｗｗｗｗｗｗｗｗｗｗ\nｗｗｗｗｗ\nｗｗｗｗｗｗｗｗｗｗｗｗｗｗ",
    media_ids: [],
  }
  const response = await request(app)
    .post('/statuses/update')
    .send(data);

  expect(response.statusCode).toEqual(200);
  expect(response.body).toEqual({
    code: 0,
    data: await listUserTimelineV1Mock(),
  });

  const expectPost: Twitter.v1.Post = {
    ... data
  };
  expect(mockedTweet).toBeCalledWith(expectPost);
});