import {GraphQLString} from 'graphql'
import {postType} from '../types/post'

const postQuery = {

    type : postType,
    args : {
        slug : {type : GraphQLString}
    },
    resolve : async({api}, args) => {

        try {
            const post = await api('/v1/post/${args.slug}')

            if(!post.success)
            {
                return [];
            }

            return post.data;
        } catch (error) {
            console.log('Error',error)
        }
    }
};

export default postQuery;