import {
  getMockTweetsByUser, userTimeline
} from '../../../repositories/mock/tweets';
import { getUserTimeline } from '../../../services/twitter';

describe('Get users timeline', () => {
  const mockedTimeline = getUserTimeline.inject(
    { getTweets: getMockTweetsByUser}
  );

  test('equals to mocked timeline.', () => {
    expect(mockedTimeline()).toEqual(Promise.resolve(userTimeline));
  });
});