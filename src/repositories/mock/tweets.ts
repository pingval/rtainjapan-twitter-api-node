import { readFileSync } from 'jsonfile';
import { getTweetsByUser, Tweet } from '../tweets';

export const userTimeline: Tweet[] = [readFileSync('stubs/tweetsByUser.json')];

export const getMockTweetsByUser: typeof getTweetsByUser = () => {
  return Promise.resolve(userTimeline);
}