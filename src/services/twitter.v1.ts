import { depend } from 'velona';
import { listUserTimelineV1, updateStatusV1 } from '@repositories/tweets.v1';
import * as Twitter from '@models/twitter';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const TIMELINE_CACHE_KEY = 'timeline-cache';
const timelineCache = new CacheContainer(new MemoryStorage());

type Cache = Pick<typeof timelineCache, 'getItem' | 'setItem'>

export const getUserTimeline = depend(
  { listUserTimelineV1, cache: timelineCache as Cache },
  async ({ listUserTimelineV1, cache }, fresh = false): Promise<Twitter.v1.Timeline> => {
    const cached = await cache.getItem<Twitter.v1.Timeline>(TIMELINE_CACHE_KEY);

    if (cached && !fresh) {
      return cached;
    }

    const timeline = await listUserTimelineV1();
    await cache.setItem(TIMELINE_CACHE_KEY, timeline, {ttl: 60});

    return timeline;
  });

export const tweet = depend(
  { updateStatusV1 },
  async ({ updateStatusV1 }, status: Twitter.v1.Post): Promise<Twitter.v1.Post> => {
    return await updateStatusV1(status);
  });