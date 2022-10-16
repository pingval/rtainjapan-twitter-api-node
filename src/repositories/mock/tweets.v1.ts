import * as Twitter from '@models/twitter';
import { readFileSync } from 'jsonfile';
import { listUserTimelineV1, updateStatusV1 } from '../tweets.v1';

export const userTimeline
  = readFileSync('stubs/tweetsByUser.json') as Twitter.v1.Timeline;

export const updateStatusV1Mock: typeof updateStatusV1 = (post) => {
  return Promise.resolve(post)
}

export const listUserTimelineV1Mock: typeof listUserTimelineV1 = () => {
  return Promise.resolve(userTimeline);
}