import { findPostMock, savePostMock } from '../../../repositories/mock/posts';
import { Post } from '../../../repositories/posts';
import { createNewPost } from '../../../services/posts';

describe('Create new post',  () => {
  const now = new Date(2022, 4, 7, 22, 21, 0);
  const mockedCreatePost = createNewPost.inject({
    now: () => { return now; },
    savePost: savePostMock
  });

  test('save tweet post', () => {
    const expected: Post = {
      id: 1,
      content: 'Hello, Twitter world!!',
      postedAt: now,
    };

    expect(mockedCreatePost('Hello, Twitter world!!')).toEqual(expected);
    expect(findPostMock(1)).toEqual(expected);
  })
})