import { GraphQLString, GraphQLNonNull } from 'graphql';
import { postType } from '../types/post';

const DEFAULT_DATA = {
  _id: null,
  title: null,
  slug: null,
  body: null,
  error: 'Error while deleting new post.'
};

const deletePost = {
  type: postType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ api }, { _id }) => {
    try {
      const deletedPost = await api(`/v1/post/${_id}`, 'DELETE')

      if(!deletedPost.success) {
        return DEFAULT_DATA;
      }

      return {
        ...deletedPost.data,
        error: null
      };
    } catch(err) {
      console.error('[DeletePost] Error while deleting data', err.statusText);
      return DEFAULT_DATA;
    }
  }
};

export default deletePost;
