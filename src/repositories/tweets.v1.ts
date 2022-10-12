import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';
import * as Twitter from '../models/twitter'

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

export const updateStatusV1 = async (post: Twitter.v1.Post): Promise<Twitter.v1.Post> => {
  await client.v1.tweet(post.status, post);
  return post;
}

export const listUserTimelineV1 = async (): Promise<Twitter.v1.Timeline> => {
  const response = await client.v1.userTimeline(config.twitter.timelineUserId, {count: 15});
  return response.data;
}