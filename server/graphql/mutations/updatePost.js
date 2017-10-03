import { GraphQLString, GraphQLNonNull } from 'graphql';
import { postType } from '../types/post';

const DEFAULT_DATA = {
  _id: null,
  title: null,
  slug: null,
  body: null,
  error: 'Error while updating post.'
};

const updatePost = {
  type: postType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ api }, { _id, title, author, body }) => {
    try {
      const data = {
        title,
        author,
        body
      }
      const updatedPost = await api(`/v1/post/${_id}`, 'PATCH', data)

      if(!updatedPost.success) {
        return DEFAULT_DATA;
      }

      return {
        ...updatedPost.data,
        error: null
      };
    } catch(err) {
      console.error('[UpdatePostMutation] Error while updating data', err.statusText);
      return DEFAULT_DATA;
    }
  }
};

export default updatePost;
