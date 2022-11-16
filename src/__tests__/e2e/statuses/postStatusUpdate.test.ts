
import * as Twitter from '@models/twitter';
import request from 'supertest';
import { ok } from 'neverthrow';

import app from '@app/index';
import { makeTweetFixture } from '__fixtures__/models/twitter';
import { getUserTimeline, tweet } from '@services/twitter';

const timeline = [
  makeTweetFixture({ id: '00000001', text: 'Hello, twitter!'}),
  makeTweetFixture({ id: '00000002', text: 'こんにちは'}),
  makeTweetFixture({ id: '00000003', text: 'よろしくお願いします'}),
]

jest.mock('@services/twitter');
jest.mocked(getUserTimeline).mockImplementation(
  async () => Promise.resolve(ok(timeline))
);
const mockedTweet = jest.mocked(tweet).mockImplementation(
  (post) => Promise.resolve(ok(makeTweetFixture({ text: post.text })))
);

test('update tweet status.', async () => {

  const data = {
    status: '走者乙ｗｗｗｗｗｗｗｗｗｗｗｗ\nｗｗｗｗｗ\nｗｗｗｗｗｗｗｗｗｗｗｗｗｗ',
  }
  const response = await request(app)
    .post('/statuses/update')
    .send(data);

  expect(response.statusCode).toEqual(200);
  expect(response.body).toEqual({
    code: 0,
    data: timeline,
  });

  const expectPost: Twitter.v2.PostTweet = {
    text: data.status,
  };
  expect(mockedTweet).toBeCalledWith(expectPost);
});