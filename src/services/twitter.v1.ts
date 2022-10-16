import { depend } from 'velona';
import { listUserTimelineV1, updateStatusV1 } from '@repositories/tweets.v1';
import * as Twitter from '@models/twitter';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { Result, ok } from 'neverthrow';

const TIMELINE_CACHE_KEY = 'timeline-cache';
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
  });

export const tweet = depend(
  { updateStatusV1 },
  async ({ updateStatusV1 }, status: Twitter.v1.Post):
    Promise<Result<Twitter.v1.Post, never>> => {
    return ok(await updateStatusV1(status));
  });