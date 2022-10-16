import { depend } from 'velona';
import { config } from '@app/config';
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
