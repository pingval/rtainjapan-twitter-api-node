import { Post, PostSaved } from '../../../models/post';
import { findPostMock, listRecentlyPostsMock, savePostMock } from '../../../repositories/mock/posts';
import { approvePost, createNewPost, getPostById, listRecently } from '../../../services/posts';

const now = new Date(2022, 4, 7, 22, 21, 0);

describe('Create new post',  () => {
  const mockedCreatePost = createNewPost.inject({
    now: () => { return now; },
    savePost: savePostMock
  });

  test('save tweet post', async () => {
    const expected: Post = {
      content: 'Hello, Twitter world!!',
      postedAt: now,
      approvedAt: null,
    };

    const created = await mockedCreatePost('Hello, Twitter world!!')
    expect(created.content).toBe(expected.content);
    expect(created.postedAt).toBe(expected.postedAt);
    expect(await findPostMock(created.id)).toEqual(created);
  });
});

describe('Get post', () => {
  const mockedGetPostById = getPostById.inject({
    findPost: findPostMock
  });

  test('get tweet post by id', async () => {
    const expected = {
      id: 123456,
      content: 'Really good run.',
      postedAt: now,
      approvedAt: null,
    };

    savePostMock(expected);

    expect(await mockedGetPostById(expected.id)).toEqual(expected);
  });
});

describe('Approve post', () => {
  const mockedApprovePost = approvePost.inject({
    findPost: findPostMock,
    savePost: savePostMock,
    now: () => { return now; },
  });

  test('approve post by id', async () => {

    const expected = {
      id: 9999,
      content: 'Good tweet',
      postedAt: now,
      approvedAt: now,
    };
  
    savePostMock({
      id: expected.id,
      content: expected.content,
      postedAt: expected.postedAt,
      approvedAt: null,
    });
  
    expect(await mockedApprovePost(expected.id)).toEqual(expected);
    expect(await findPostMock(expected.id)).toEqual(expected);

  });

});

describe('List tweet posts', () => {
  const mockedListRecently = listRecently.inject({
    listRecentlyPosts: listRecentlyPostsMock,
  });

  test('list recently posts', async () => {
    const posts: PostSaved[] = [
      {
        id: 1,
        content: 'Hi administrators!',
        postedAt: new Date(2023, 1, 1),
        approvedAt: null
      },
      {
        id: 2,
        content: 'Great event. GG',
        postedAt: new Date(2023, 2, 1),
        approvedAt: null
      },
      {
        id: 3,
        content: 'Just do it',
        postedAt: new Date(2023, 3, 1),
        approvedAt: null
      },
      {
        id: 4,
        content: 'Oops, really bad tweet',
        postedAt: new Date(2023, 4, 1),
        approvedAt: null
      },
      {
        id: 5,
        content: 'Good game',
        postedAt: new Date(2023, 5, 1),
        approvedAt: null
      },
    ];

    posts.forEach((post) => savePostMock(post));

    expect(await mockedListRecently()).toEqual(expect.arrayContaining(posts));
  })
});