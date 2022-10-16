import { readFileSync } from 'jsonfile';
import { getTweetsByUser, Tweet } from '../tweets';

export const userTimeline = [
  readFileSync('stubs/tweetsByUser.json')
] as Tweet[];

export const getMockTweetsByUser: typeof getTweetsByUser = () => {
  return Promise.resolve(userTimeline);
}