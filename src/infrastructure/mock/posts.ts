import { SavedPost } from '../../models/post';
import { findPost, listRecentlyPosts, savePost } from '../posts';

const posts: { [k: number]: SavedPost } = {};

export const lastId = () => {
  return Math.max(0, ... Object.keys(posts).map(k => parseInt(k)));
}

export const savePostMock: typeof savePost = (post) => {
  const lId = lastId();

  const saveOne = {
    id: post.id ?? (lId + 1),
    ...post
  };
  posts[saveOne.id] = saveOne;
  return Promise.resolve(saveOne);
};

export const listRecentlyPostsMock: typeof listRecentlyPosts = (
  limit: number
) => {
  return Promise.resolve(Object.values(posts).sort(
    (a, b) => b.postedAt.valueOf() - a.postedAt.valueOf()
  ).slice(0, limit));
}

export const findPostMock: typeof findPost = (id: number) => {
  return Promise.resolve(posts[id]);
}