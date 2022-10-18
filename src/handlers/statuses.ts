import * as Twitter from '@models/twitter';
import Response from '../responses';
import { AsyncRequestHandler } from '.';
import {
  getUserTimeline,
  getMentionTimeline,
  searchByHashtag,
  deleteTweet,
  tweet,
} from '@services/twitter';

export const userTimelineHandler: AsyncRequestHandler = 
  async (_, res) => {
    const timeline = await getUserTimeline();

    if (timeline.isErr()) {
      throw timeline.error;
    }

    return res.json(Response.success(timeline.value));
  };

export const mentionTimelineHandler: AsyncRequestHandler =
async (_, res) => {
  const mentionTimeline = await getMentionTimeline();

  if (mentionTimeline.isErr()) {
    throw mentionTimeline.error;
  }

  return res.json(Response.success(mentionTimeline.value));
}

export const searchByHashtagHandler: AsyncRequestHandler =
async (_, res) => {
  const searchedTweets = await searchByHashtag();

  if (searchedTweets.isErr()) {
    throw searchedTweets.error;
  }

  return res.json(Response.success(searchedTweets.value))
}

type UpdateStatusRequest = Pick<
  Twitter.v1.Post, 'status'|'media_ids'|'in_reply_to_status_id'|'attachment_url'
>;

export const updateStatusHandler: AsyncRequestHandler<
  unknown, unknown, UpdateStatusRequest
> = async (req, res) => {
  await tweet(req.body);
  const timeline = await getUserTimeline(true);

  if (timeline.isErr()) {
    throw timeline.error;
  }
    
  return res.json(Response.success(timeline.value));
}

type DestroyStatusParameter = {
  id: string;
}

export const destroyStatusHandler: AsyncRequestHandler<
  DestroyStatusParameter
> = async (req, res) => {
  await deleteTweet(req.params.id);
  const timeline = await getUserTimeline(true);

  if (timeline.isErr()) {
    throw timeline.error;
  }
    
  return res.json(Response.success(timeline.value));
}