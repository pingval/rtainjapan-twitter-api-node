import { PrismaClient } from '@prisma/client';
import { Post, PostSaved } from '../models/post';

const client = new PrismaClient();

export const savePost = async (post: Post): Promise<PostSaved> => {
  return client.tweetPosts.create({ data: post });
};

export const listRecentlyPosts = (limit: number): Promise<PostSaved[]> => {
  return client.tweetPosts.findMany({
    orderBy: {
      postedAt: 'desc',
    },
    take: limit,
  });
};

export const findPost = (id: number): Promise<PostSaved|null> => {
  return client.tweetPosts.findUnique({
    where: {id},
  });
}
