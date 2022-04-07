import { userTimeline } from '../repositories/mock/tweets';
import { getUserTimeline } from './twitter';

describe('Get users timeline', () => {
  const mockedTimeline = getUserTimeline.inject({ getTweetsByUser: (_) => {
    return Promise.resolve(userTimeline);
  } });

  test('equals to mocked timeline.', () => {
    expect(mockedTimeline()).toEqual(Promise.resolve(userTimeline));
  });
});