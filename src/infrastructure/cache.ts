import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import * as Twitter from '@models/twitter';
import { config } from '@app/config';

const TIMELINE_CACHE_KEY = 'timeline-cache-v2';
const MENTION_CACHE_KEY = 'mention-cache-v2';
const HASHTAG_CACHE_KEY = 'hashtag-cache-v2';

const cache = new CacheContainer(new MemoryStorage());

export const getCachedTimeline = () => {
  return cache.getItem<Twitter.v2.Tweet[]>(TIMELINE_CACHE_KEY);
}

export const cacheTimeline = (timeline: Twitter.v2.Tweet[]) => {
  return cache.setItem(TIMELINE_CACHE_KEY, timeline, {
    ttl: config.cache.ttl,
  });
}

export const getCachedMentions = () => {
  return cache.getItem<Twitter.v2.Tweet[]>(MENTION_CACHE_KEY);
}

export const cacheMentions = (timeline: Twitter.v2.Tweet[]) => {
  return cache.setItem(MENTION_CACHE_KEY, timeline, {
    ttl: config.cache.ttl,
  });
}

export const getHashtagResult = () => {
  return cache.getItem<Twitter.v2.Tweet[]>(HASHTAG_CACHE_KEY);
}

export const cacheHashtagResult = (timeline: Twitter.v2.Tweet[]) => {
  return cache.setItem(HASHTAG_CACHE_KEY, timeline, {
    ttl: config.cache.ttl,
  });
}