

import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config';

export type UserId = string;

export type TweetId = string;

export type Tweet<Opt extends {[k:string]: string} = {}> = {
  id: UserId;
  text: string;
} & Opt;

export type MentionTweet = Tweet<{
  in_reply_to_user_id: UserId;
}>;

export type PostTweet = {
  text: string;
  media?: {
    media_ids?: TweetId[];
    tagged_user_ids: UserId[];
  }
}

const client = new TwitterApi(config.twitter.bearer);

export const getTweetsByUser = async (id: UserId): Promise<Tweet[]> => {
  const timeline = await client.v2.userTimeline(id);

  return timeline.data.data;
}
