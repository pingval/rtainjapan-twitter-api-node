import { depend } from 'velona';
import { savePostMock } from '../repositories/mock/posts';
import { newPost, Post, savePost } from '../repositories/posts';

export const createNewPost = depend(
  {
    now: () => {
      return new Date();
    },
    savePost: savePostMock
  },
  (
    { now },
    content: string
  ): Post => {
    const post = newPost(content, now());

    return savePost(post);
  }
);