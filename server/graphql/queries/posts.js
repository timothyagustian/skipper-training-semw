import { postsType } from '../types/post';

const DEFAULT_DATA = [];

const posts = {
  type: postsType,
  args: {},
  resolve: async ({ api }, args, context) => {
    try {
      const posts = await api('/v1/posts')

      if(!posts.success) {
        return DEFAULT_DATA;
      }

      return posts.data;
    } catch(err) {
      console.error('[PostsQuery] Error while getting posts data', err.statusText);
      return DEFAULT_DATA;
    }
  }
}

export default posts;