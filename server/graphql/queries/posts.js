import {postsType} from '../types/post'

const postsQuery = {
    type : postsType,
    args : {},
    resolve : async({api}, args) => {

        try {
            const posts = await api('/v1/posts')

            if (!posts.success) {
                return [];
            }

            return posts.data;
        } catch (error) {
            console.log('Error',error)
        }
    }
};

export default postsQuery;