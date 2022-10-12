export type Post = {
  id?: number;
  content: string;
  postedAt: Date;
  approvedAt: Date|null;
};

export type SavedPost = {
  id: number;
} & Post;

export const newPost = (
  content: string,
  now: Date
): Post => {
  return {
    content,
    postedAt: now,
    approvedAt: null
  };
}

export const approve = (post: Post, now: Date): Post => {
  return {
    ... post,
    approvedAt: now,
  };
}

