import { PrismaClient } from '@prisma/client';
import { Post, SavedPost } from '../models/post';

const client = new PrismaClient();

export const savePost = async (post: Post): Promise<SavedPost> => {
  return client.tweetPosts.create({ data: post });
};

export const listRecentlyPosts = (limit: number): Promise<SavedPost[]> => {
  return client.tweetPosts.findMany({
    orderBy: {
      postedAt: 'desc',
    },
    take: limit,
  });
};

export const findPost = (id: number): Promise<SavedPost|null> => {
  return client.tweetPosts.findUnique({
    where: {id},
  });
}
