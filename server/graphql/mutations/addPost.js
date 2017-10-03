import { GraphQLString, GraphQLNonNull } from 'graphql';
import { postType } from '../types/post';

const DEFAULT_DATA = {
  _id: null,
  title: null,
  slug: null,
  body: null,
  error: 'Error while adding new post.'
};

const addPost = {
  type: postType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async ({ api }, { title, author, body }) => {
    try {
      const data = {
        title,
        author,
        body
      }

      const addedPost = await api('/v1/post', 'POST', data)
      
      if(!addedPost.success) {
        return DEFAULT_DATA;
      }

      return {
        ...addedPost.data,
        error: null
      };
    } catch(err) {
      console.error('[AddPostMutation] Error while adding data', err.statusText);
      return DEFAULT_DATA;
    }
  }
};

export default addPost;
