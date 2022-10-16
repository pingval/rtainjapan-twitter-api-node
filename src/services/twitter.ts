import { depend } from 'velona';
import { getTweets, MentionTweet, Tweet } from '../repositories/tweets';

export const getUserTimeline = depend(
  { getTweets },
  ({ getTweets }): Promise<Tweet[]> => {
    return getTweets();
  });

export const getMentionTimeline = (): MentionTweet[] => {
  return [];
};
