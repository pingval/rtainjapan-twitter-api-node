import { config } from '../config';
import { depend } from 'velona';
import { getTweetsByUser, MentionTweet, Tweet } from '../repositories/tweets';

export const getUserTimeline = depend(
  { getTweetsByUser },
  ({ getTweetsByUser }): Promise<Tweet[]> => {
    return getTweetsByUser(
      config.twitter.timelineUserId
    );
  });

export const getMentionTimeline = (): MentionTweet[] => {
  return [];
};
