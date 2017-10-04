import
{
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType
} from 'graphql'

const postType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        _id: {type : new GraphQLNonNull(GraphQLString)},
        slug: {type : new GraphQLNonNull(GraphQLString)},
        title: {type : new GraphQLNonNull(GraphQLString)},
        author: {type : new GraphQLNonNull(GraphQLString)},
        body: {type : new GraphQLNonNull(GraphQLString)},
    }
});

const postsType = new GraphQLList(postType)

export {postType, postsType} ;