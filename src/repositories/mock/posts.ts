import { findPost, listRecentlyPost, Post, savePost } from '../posts';

const posts: Post[] = [];

export const savePostMock: typeof savePost = (post) => {
  const lastId = posts.length;
  const saveOne: Post = {
    id: lastId + 1,
    ...post
  };
  posts.push(saveOne);
  return saveOne;
};

export const listRecentlyPostMock: typeof listRecentlyPost = (limit: number) => {
  return posts.sort(
    (a, b) => b.postedAt.valueOf() - a.postedAt.valueOf()
  ).slice(0, limit);
}

export const findPostMock: typeof findPost = (id: number) => {
  return posts.find((post) => post.id === id) || null;
}