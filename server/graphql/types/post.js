import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

const postType = new GraphQLObjectType({
  name: 'PostType',
  description: 'Post data definition.',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const postsType = new GraphQLList(postType);

export { postsType, postType };
