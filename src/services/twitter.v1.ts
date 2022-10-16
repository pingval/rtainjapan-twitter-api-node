import { depend } from 'velona';
import {
  listUserTimelineV1, updateStatusV1, listMentionTimelineV1
} from '@repositories/tweets.v1';
import { uploadMediaV1 } from '@repositories/media.v1';
import * as Twitter from '@models/twitter';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { Result, ok } from 'neverthrow';

const TIMELINE_CACHE_KEY = 'timeline-cache';
const MENTION_CACHE_KEY = 'mention-cache';

const timelineCache = new CacheContainer(new MemoryStorage());

type Cache = Pick<typeof timelineCache, 'getItem' | 'setItem'>

export const getUserTimeline = depend(
  { listUserTimelineV1, cache: timelineCache as Cache },
  async ({ listUserTimelineV1, cache }, fresh = false):
    Promise<Result<Twitter.v1.Timeline, never>> => {
    const cached = await cache.getItem<Twitter.v1.Timeline>(TIMELINE_CACHE_KEY);

    if (cached && !fresh) {
      return ok(cached);
    }

    const timeline = await listUserTimelineV1();
    await cache.setItem(TIMELINE_CACHE_KEY, timeline, {ttl: 60});

    return ok(timeline);
  }
);

export const getMentionTimeline = depend(
  { listMentionTimelineV1, cache: timelineCache as Cache },
  async ({ listMentionTimelineV1, cache }, fresh = false):
    Promise<Result<Twitter.v1.Timeline, never>> => {

    const cached = await cache.getItem<Twitter.v1.Timeline>(MENTION_CACHE_KEY);

    if (cached && !fresh) {
      return ok(cached);
    }

    const mentionTimeline = await listMentionTimelineV1();
    await cache.setItem(MENTION_CACHE_KEY, mentionTimeline, {ttl: 60});

    return ok(mentionTimeline);
  }
)

export const tweet = depend(
  { updateStatusV1 },
  async ({ updateStatusV1 }, status: Twitter.v1.Post):
    Promise<Result<Twitter.v1.Post, never>> => {

    return ok(await updateStatusV1(status));
  }
);

export const uploadMedia = depend(
  { uploadMediaV1 },
  async ({ uploadMediaV1 }, path: string, mimeType: string):
    Promise<Result<Twitter.v1.MediaIdString, never>> => {

    return ok(await uploadMediaV1(path, mimeType));
  }
);