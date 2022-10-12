

import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';

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

export const getTweetsByUser = async (id: UserId): Promise<Tweet[]> => {
  const timeline = await client.v2.userTimeline(id);

  return timeline.data.data;
}
