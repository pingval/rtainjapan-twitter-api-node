import { depend } from 'velona';
import * as Post from '@models/post';
import { savePost, findPost, listRecentlyPosts } from '../repositories/posts';

export const createNewPost = depend(
  { now: () => { return new Date(); },
    savePost
  },
  (
    { now, savePost },
    content: string
  ) => {
    const post = Post.newPost(content, now());

    return savePost(post);
  }
);

export const getPostById = depend(
  { findPost },
  async (
    { findPost },
    id: number
  ) => {
    const post = await findPost(id);

    if (!post) {
      throw new Error('Post is not found.');
    }

    return post;
  }
);

export const approvePost = depend(
  { findPost, savePost, now: () => { return new Date(); } },
  async (
    { findPost, savePost, now },
    id: number
  ) => {
    const post = await findPost(id);

    if (!post) {
      throw new Error('Post is not found.');
    }

    return savePost(Post.approve(post, now()));
  }
);

export const listRecently = depend(
  { listRecentlyPosts },
  async (
    { listRecentlyPosts }
  ) => {
    return listRecentlyPosts(10);
  }
)