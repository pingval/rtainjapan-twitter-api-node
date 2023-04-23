import { config } from '@app/config';
import { err, ok, Result } from 'neverthrow';
import { depend } from 'velona';
import {
  listUserTimeline,
  listMentionTimeline,
  searchByQuery,
  updateStatus,
  deleteStatus,
  TwitterError,
} from '../infrastructure/tweets';
import { uploadMediaV1 } from 'infrastructure/media.v1';
import * as Twitter from '@models/twitter';
import {
  getCachedTimeline,
  cacheTimeline,
  getCachedMentions,
  cacheMentions,
  getHashtagResult,
  cacheHashtagResult,
} from '@infrastructure/cache'
import {
  listTweetHistoryInMemory,
  saveTweetHistory
} from '@infrastructure/tweets.memory'
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
})

export const getUserTimeline = depend(
  {
    getTweets: listUserTimeline,
    getCachedTimeline,
    cacheTimeline,
    listTweetHistoryInMemory,
    logger,
  },
  async ({
    getTweets,
    getCachedTimeline,
    cacheTimeline,
    listTweetHistoryInMemory,
    logger,
  }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], TwitterError>> => {
    try {
      const cached = await getCachedTimeline();

      if (cached && !fresh) {
        return ok(cached);
      }

      const timeline = await getTweets();
      if (config.cache.enabled) {
        await cacheTimeline(timeline);
      }
      return ok(timeline);

    } catch (e) {
      if (e instanceof TwitterError) {
        logger.warn(
          'Failed to fetch tweets from Twitter API. Use history from inmemory.'
        );
        
        return ok(await listTweetHistoryInMemory());
      }
      throw e;
    }
  }
);

export const getMentionTimeline = depend(
  { listMentionTimeline, getCachedMentions, cacheMentions, logger },
  async ({
    listMentionTimeline, getCachedMentions, cacheMentions, logger
  }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], TwitterError>> => {
    try {
      const cached = await getCachedMentions();
  
      if (cached && !fresh) {
        return ok(cached);
      }
  
      const mentions = await listMentionTimeline();
      if (config.cache.enabled) {
        await cacheMentions(mentions);
      }
  
      return ok(mentions);
    } catch (e) {
      if (e instanceof TwitterError) {
        logger.warn(
          'Failed to fetch tweets from Twitter API. Return empty.'
        );
        logger.warn(e);
        return ok([]);
      }
      throw e;
    }
  }
)

export const searchByHashtag = depend(
  { searchByQuery, getHashtagResult, cacheHashtagResult, logger },
  async ({
    searchByQuery,
    getHashtagResult,
    cacheHashtagResult,
    logger
  }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], TwitterError>> => {
    try {
      const cached = await getHashtagResult();
  
      if (cached && !fresh) {
        return ok(cached);
      }
  
      const searchResult = await searchByQuery(`${config.hashtag} -is:retweet`);
      if (config.cache.enabled) {
        await cacheHashtagResult(searchResult);
      }
  
      return ok(searchResult); 
    } catch (e) {
      logger.warn(
        'Failed to fetch tweets from Twitter API. Return empty.'
      );
      logger.warn(e);
      return ok([]);
    }
  }
)

export const tweet = depend(
  { updateStatus, listUserTimeline, cacheTimeline, logger },
  async ({
    updateStatus,
    listUserTimeline,
    cacheTimeline,
    logger,
  }, status: Twitter.v2.PostTweet):
    Promise<Result<Twitter.v2.Tweet, TwitterError>> => {

    try {
      const updated = await updateStatus(status);
      await saveTweetHistory(updated);

      try {
        const timeline = await listUserTimeline();

        if (
          !timeline.some(tweet => tweet.id === updated.id)
          && config.cache.enabled
        ) {
          await cacheTimeline([
            updated,
            ... timeline.slice(0, -1),
          ]);
        }

      } catch (getError) {
        logger.warn(
          'Failed to fetch tweets from Twitter API. Skip update cache.'
        );
        logger.warn(getError);
        return ok(updated);
      }

      return ok(updated);
    } catch (e) {
      if (e instanceof TwitterError) {
        return err(e);
      }
      throw e;
    }
  }
);

export const uploadMedia = depend(
  { uploadMedia: uploadMediaV1 },
  async ({ uploadMedia }, path: string, mimeType: string):
    Promise<Result<Twitter.v1.MediaIdString, TwitterError>> => {

    try {
      return ok(await uploadMedia(path, mimeType)); 
    } catch (e) {
      if (e instanceof TwitterError) {
        return err(e);
      }
      throw e;
    }
  }
);

export const deleteTweet = depend(
  { deleteStatus },
  async ({ deleteStatus }, id: Twitter.v2.TweetId)
  : Promise<Result<void, TwitterError>> => {
    try {
      return ok(await deleteStatus(id));
    } catch (e) {
      if (e instanceof TwitterError) {
        return err(e);
      }
      throw e;
    }
  }
)