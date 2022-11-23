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

export const getUserTimeline = depend(
  { getTweets: listUserTimeline, getCachedTimeline, cacheTimeline },
  async ({ getTweets, getCachedTimeline, cacheTimeline }, fresh = false)
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
        return err(e);
      }
      throw e;
    }
  });

export const getMentionTimeline = depend(
  { listMentionTimeline, getCachedMentions, cacheMentions },
  async ({
    listMentionTimeline, getCachedMentions, cacheMentions
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
        return err(e);
      }
      throw e;
    }
  }
)

export const searchByHashtag = depend(
  { searchByQuery, getHashtagResult, cacheHashtagResult },
  async ({ searchByQuery, getHashtagResult, cacheHashtagResult }, fresh = false)
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
      if (e instanceof TwitterError) {
        return err(e);
      }
      throw e;
    }
  }
)

export const tweet = depend(
  { updateStatus, listUserTimeline, cacheTimeline },
  async ({
    updateStatus,
    listUserTimeline,
    cacheTimeline
  }, status: Twitter.v2.PostTweet):
    Promise<Result<Twitter.v2.Tweet, TwitterError>> => {

    try {
      const updated = await updateStatus(status);
      const timeline = await listUserTimeline();
  
      if (!timeline.some(tweet => tweet.id === updated.id)) {
        await cacheTimeline([
          updated,
          ... timeline.slice(0, -1),
        ]);
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