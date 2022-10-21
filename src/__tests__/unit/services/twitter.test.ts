import { getUserTimeline } from '@services/twitter';
import { makeTweetFixture } from '__fixtures__/models/twitter';

describe('Getting users timeline', () => {
  const timeline = [
    makeTweetFixture({ id: '0000000000001'}),
    makeTweetFixture({ id: '0000000000002'}),
    makeTweetFixture({ id: '0000000000003'}),
  ];

  const mockedGetUserTimeline = getUserTimeline.inject(
    { getTweets: () => Promise.resolve(timeline) }
  );

  it('should be received mocked timeline.', async () => {
    const result = await mockedGetUserTimeline();
    expect(result.isOk() && result.value).toEqual(timeline);
  });
});