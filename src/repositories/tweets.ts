

import { TwitterApi } from 'twitter-api-v2';
import { config } from '@app/config';

export type UserId = string;

export type TweetId = string;

export type Tweet = {
  id: UserId;
  text: string;
};

export type MentionTweet = Tweet & {
  in_reply_to_user_id: UserId;
};

export type PostTweet = {
  text: string;
  media?: {
    media_ids?: TweetId[];
    tagged_user_ids: UserId[];
  }
}

const client = new TwitterApi({
  appKey: config.twitter.apiKey,
  appSecret: config.twitter.apiSecret,
  accessToken: config.twitter.accessToken,
  accessSecret: config.twitter.accessSecret,
});

export const getTweets = async (): Promise<Tweet[]> => {
  const { data: me } = await client.currentUserV2();
  const timeline = await client.v2.userTimeline(me.id);

  return timeline.data.data;
}

export const searchByQuery = async (query: string): Promise<Tweet[]> => {
  const response = await client.search(query);

  return response.data.data;
}