import { getUserTimeline } from '@services/twitter.v1';
import {
  listUserTimelineV1Mock, userTimeline
} from '@repositories/mock/tweets.v1';

describe('Get user\'s timeline without cached', () => {

  const setItemMock = jest.fn(() => Promise.resolve());

  const getMockedTimeline = getUserTimeline.inject({
    listUserTimelineV1: listUserTimelineV1Mock,
    cache: {
      getItem: () => Promise.resolve(undefined),
      setItem: setItemMock,
    }
  });

  test('response should be equals to mocked timeline.', async () => {
    const result = await getMockedTimeline();
    expect(result.isOk() && result.value).toEqual(userTimeline);
    expect(setItemMock).toBeCalledWith(
      'timeline-cache', userTimeline, {ttl: 60}
    );
  });
});