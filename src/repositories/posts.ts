import { findPostMock, listRecentlyPostMock, savePostMock } from './mock/posts';

export type Post = {
  id?: number;
  content: string;
  postedAt: Date;
  approvedAt?: Date;
};

export const newPost = (
  content: string,
  now: Date
): Post => {
  return {
    content,
    postedAt: now
  };
};

export const savePost = (post: Post): Post => {
  return savePostMock(post);
};

export const listRecentlyPost = (limit: number): Post[] => {
  return listRecentlyPostMock(limit);
};

export const findPost = (id: number): Post|null => {
  return findPostMock(id);
}