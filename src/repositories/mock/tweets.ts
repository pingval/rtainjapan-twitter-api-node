import { readFile } from 'jsonfile';
import { getTweetsByUser, Tweet } from '../tweets';

export const userTimeline: Tweet[] = [];

readFile('stubs/tweetsByUser.json').then((data: Tweet[]) => {
  userTimeline.push(...data);
});

export const getMockTweetsByUser: typeof getTweetsByUser = () => {
  return Promise.resolve(userTimeline);
}