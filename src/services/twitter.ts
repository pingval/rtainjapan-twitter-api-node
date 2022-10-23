import { config } from '@app/config';
import { ok, Result } from 'neverthrow';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { depend } from 'velona';
import {
  listUserTimeline,
  listMentionTimeline,
  searchByQuery,
} from '../infrastructure/tweets';
import { updateStatusV1, deleteStatusV1 } from 'infrastructure/tweets.v1';
import { uploadMediaV1 } from 'infrastructure/media.v1';
import * as Twitter from '@models/twitter';

const TIMELINE_CACHE_KEY = 'timeline-cache-v2';
const MENTION_CACHE_KEY = 'mention-cache-v2';
const HASHTAG_CACHE_KEY = 'hashtag-cache-v2';

const timelineCache = new CacheContainer(new MemoryStorage());

type Cache = Pick<typeof timelineCache, 'getItem' | 'setItem'>

export const getUserTimeline = depend(
  { getTweets: listUserTimeline, cache: timelineCache as Cache },
  async ({ getTweets, cache }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], never>> => {
    const cached = await cache.getItem<Twitter.v2.Tweet[]>(TIMELINE_CACHE_KEY);

    if (cached && !fresh) {
      return ok(cached);
    }

    const timeline = await getTweets();
    if (config.cache.enabled) {
      await cache.setItem(
        TIMELINE_CACHE_KEY, timeline,
        {ttl: config.cache.ttl},
      );
    }

    return ok(timeline);
  });

export const getMentionTimeline = depend(
  { listMentionTimeline, cache: timelineCache as Cache },
  async ({ listMentionTimeline, cache }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], never>> => {
    const cached = await cache.getItem<Twitter.v2.Tweet[]>(MENTION_CACHE_KEY);

    if (cached && !fresh) {
      return ok(cached);
    }

    const mentions = await listMentionTimeline();
    if (config.cache.enabled) {
      await cache.setItem(
        MENTION_CACHE_KEY, mentions,
        {ttl: config.cache.ttl},
      );
    }

    return ok(mentions);
  }
)

export const searchByHashtag = depend(
  { searchByQuery, cache: timelineCache as Cache },
  async ({ searchByQuery, cache }, fresh = false)
  : Promise<Result<Twitter.v2.Tweet[], never>> => {
    const cached = await cache.getItem<Twitter.v2.Tweet[]>(HASHTAG_CACHE_KEY);

    if (cached && !fresh) {
      return ok(cached);
    }

    const searchResult = await searchByQuery(config.hashtag);
    if (config.cache.enabled) {
      await cache.setItem(
        HASHTAG_CACHE_KEY, searchResult,
        {ttl: config.cache.ttl},
      );
    }

    return ok(searchResult);
  }
)

export const tweet = depend(
  { updateStatus: updateStatusV1 },
  async ({ updateStatus }, status: Twitter.v1.Post):
    Promise<Result<Twitter.v1.Post, never>> => {

    return ok(await updateStatus(status));
  }
);

export const uploadMedia = depend(
  { uploadMedia: uploadMediaV1 },
  async ({ uploadMedia }, path: string, mimeType: string):
    Promise<Result<Twitter.v1.MediaIdString, never>> => {

    return ok(await uploadMedia(path, mimeType));
  }
);

export const deleteTweet = depend(
  { deleteStatus: deleteStatusV1 },
  async ({ deleteStatus }, id: Twitter.v1.StatusId)
  : Promise<Result<void, never>> => {
    return ok(await deleteStatus(id));
  }
)