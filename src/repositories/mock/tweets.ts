import { readFileSync } from 'jsonfile';
import { getTweets, Tweet } from '../tweets';

export const userTimeline = [
  readFileSync('stubs/tweetsByUser.json')
] as Tweet[];

export const getMockTweetsByUser: typeof getTweets = () => {
  return Promise.resolve(userTimeline);
}