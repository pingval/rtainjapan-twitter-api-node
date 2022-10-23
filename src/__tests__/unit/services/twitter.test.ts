import {
  getMentionTimeline,
  getUserTimeline,
  searchByHashtag
} from '@services/twitter';
import { makeTweetFixture } from '__fixtures__/models/twitter';

describe('Getting users timeline', () => {
  describe('when cache doesn\'t exist', () => {
    const timeline = [
      makeTweetFixture({ id: '0000000000001'}),
      makeTweetFixture({ id: '0000000000002'}),
      makeTweetFixture({ id: '0000000000003'}),
    ];
  
    const mockedGetUserTimeline = getUserTimeline.inject(
      {
        getTweets: () => Promise.resolve(timeline),
        getCachedTimeline: () => Promise.resolve(undefined),
        cacheTimeline: () => Promise.resolve(),
      }
    );

    it('should be received mocked timeline.', async () => {
      const result = await mockedGetUserTimeline();
      expect(result.isOk() && result.value).toEqual(timeline);
    });
  });

  describe('when cache exists', () => {
    const cached = [
      makeTweetFixture({ id: '1000000000001'}),
      makeTweetFixture({ id: '1000000000002'}),
      makeTweetFixture({ id: '1000000000003'}),
    ];
  
    const mockedGetUserTimeline = getUserTimeline.inject(
      {
        getTweets: () => Promise.resolve([]),
        getCachedTimeline: () => Promise.resolve(cached),
        cacheTimeline: () => Promise.resolve(),
      }
    );

    it('should be received mocked cache.', async () => {
      const result = await mockedGetUserTimeline();
      expect(result.isOk() && result.value).toEqual(cached);
    });

  });
});

describe('Getting mention timeline', () => {
  describe('when cache doesn\'t exist', () => {
    const timeline = [
      makeTweetFixture({ id: '0000000000001'}),
      makeTweetFixture({ id: '0000000000002'}),
      makeTweetFixture({ id: '0000000000003'}),
    ];
  
    const mockedGetMentionTimeline = getMentionTimeline.inject(
      {
        listMentionTimeline: () => Promise.resolve(timeline),
        getCachedMentions: () => Promise.resolve(undefined),
        cacheMentions: () => Promise.resolve(),
      }
    );
  
    it('should be received mocked mentions.', async () => {
      const result = await mockedGetMentionTimeline();
      expect(result.isOk() && result.value).toEqual(timeline);
    });
  });

  describe('when cache exists', () => {
    const cached = [
      makeTweetFixture({ id: '0000000000001'}),
      makeTweetFixture({ id: '0000000000002'}),
      makeTweetFixture({ id: '0000000000003'}),
    ];
  
    const mockedGetMentionTimeline = getMentionTimeline.inject(
      {
        listMentionTimeline: () => Promise.resolve([]),
        getCachedMentions: () => Promise.resolve(cached),
        cacheMentions: () => Promise.resolve(),
      }
    );
  
    it('should be received mocked cache.', async () => {
      const result = await mockedGetMentionTimeline();
      expect(result.isOk() && result.value).toEqual(cached);
    });
  });
});

describe('Search by hashtag', () => {
  describe('when cache doesn\'t exist', () => {
    const searched = [
      makeTweetFixture({ id: '0000000000001'}),
      makeTweetFixture({ id: '0000000000002'}),
      makeTweetFixture({ id: '0000000000003'}),
    ];
  
    const mockedSearchByHashtag = searchByHashtag.inject(
      {
        searchByQuery: () => Promise.resolve(searched),
        getHashtagResult: () => Promise.resolve(undefined),
        cacheHashtagResult: () => Promise.resolve(),
      }
    );
  
    it('should be received mocked result.', async () => {
      const result = await mockedSearchByHashtag();
      expect(result.isOk() && result.value).toEqual(searched);
    });
  });

  describe('when cache exists', () => {
    const cached = [
      makeTweetFixture({ id: '0000000000001'}),
      makeTweetFixture({ id: '0000000000002'}),
      makeTweetFixture({ id: '0000000000003'}),
    ];
  
    const mockedSearchByHashtag = searchByHashtag.inject(
      {
        searchByQuery: () => Promise.resolve([]),
        getHashtagResult: () => Promise.resolve(cached),
        cacheHashtagResult: () => Promise.resolve(),
      }
    );
  
    it('should be received mocked cache.', async () => {
      const result = await mockedSearchByHashtag();
      expect(result.isOk() && result.value).toEqual(cached);
    });
  });
});