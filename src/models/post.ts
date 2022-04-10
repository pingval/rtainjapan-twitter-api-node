export type Post = {
  id?: number;
  content: string;
  postedAt: Date;
  approvedAt: Date|null;
};

export type PostSaved = {
  id: number;
} & Post;

export default {
  
  newPost: (
    content: string,
    now: Date
  ): Post => {
    return {
      content,
      postedAt: now,
      approvedAt: null
    };
  },

  approve: (post: Post, now: Date): Post => {
    return {
      ... post,
      approvedAt: now,
    };
  },

};