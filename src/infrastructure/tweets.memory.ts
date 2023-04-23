import { Tweet } from '@models/twitter/v2';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const storage = new CacheContainer(new MemoryStorage());
const KEY = 'TWEETS';
const STORAGE_SIZE = 50;

export const listTweetHistoryInMemory = async (): Promise<Tweet[]> => {
  return await storage.getItem<Tweet[]>(KEY) || [];
}

export const saveTweetHistory = async (tweet: Tweet): Promise<Tweet[]> => {
  const cached = await storage.getItem<Tweet[]>(KEY) || [];
  const newTweets = [
    tweet,
    ... cached
  ].slice(0, STORAGE_SIZE);

  await storage.setItem(KEY, newTweets, { isCachedForever: true });

  return newTweets;
}