import { GraphQLNonNull, GraphQLString } from 'graphql'
import { postType } from '../types/post';

const DEFAULT_DATA = {};

const post = {
  type: postType,
  args: {
    slug: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async ({ api }, args) => {
    try {
      const post = await api(`/v1/post/${args.slug}`)

      if(!post.success) {
        return DEFAULT_DATA;
      }

      return post.data;
    } catch(err) {
      console.error('[PostsQuery] Error while getting post data', err.statusText);
      return DEFAULT_DATA;
    }
  }
}

export default post;