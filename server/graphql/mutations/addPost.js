import {GraphQLString} from 'graphql'
import {postType} from '../types/post'


const addPost = {
    type : postType,
    args : {
        title : { GraphQLString},
        author: { GraphQLString},
        body: { GraphQLString}
    },

    resolve : async({api},args) => {

        try {

            const data ={
                title : args.title,
                author: args.author,
                body : args.body
            }

            const addedPost = await api('/v1/post','POST',data);

            if(!addedPost.success)
            {
                return {};
            }
            return addedPost.data;
            
        } catch (error) {
            console.log("Err",error);
            return {};
        }
       
    }
};
 