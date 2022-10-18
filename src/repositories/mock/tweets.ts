import { readFileSync } from 'jsonfile';
import { listUserTimeline, Tweet } from '../tweets';

export const userTimeline = [
  readFileSync('stubs/tweetsByUser.json')
] as Tweet[];

export const getMockTweetsByUser: typeof listUserTimeline = () => {
  return Promise.resolve(userTimeline);
}