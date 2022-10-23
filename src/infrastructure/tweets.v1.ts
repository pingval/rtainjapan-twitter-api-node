import { TwitterApi } from 'twitter-api-v2';
import { config } from '@app/config';
import * as Twitter from '@models/twitter'

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

export const updateStatusV1 = async (
  post: Twitter.v1.Post
): Promise<Twitter.v1.Post> => {
  await client.v1.tweet(post.status, post);
  return post;
}

export const deleteStatusV1 = async (
  id: Twitter.v1.StatusId,
): Promise<void> => {
  await client.v1.deleteTweet(id);
}

export const listUserTimelineV1 = async (): Promise<Twitter.v1.Timeline> => {
  const { data: me } = await client.currentUserV2();
  const response = await client.v1.userTimeline(
    me.id, {count: 15}
  );
  return response.data;
}

export const listMentionTimelineV1 = async (): Promise<Twitter.v1.Timeline> => {
  const response = await client.v1.mentionTimeline({
    count: 15,
  });
  return response.data;
}
