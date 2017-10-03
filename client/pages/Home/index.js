import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { graphql, compose } from 'react-apollo';

import Loader from '../../components/Loader';
import PostQuery from './postsQuery.graphql';
import DeletePostMutation from './deletePost.graphql';
import './styles.css';

class Home extends Component {
  state = {
    deleteMessage: null
  }

  hideMessage = () => setTimeout(() => this.setState({ deleteMessage: null }), 3000)

  handleDeletePost = postID => event => {
    event.preventDefault();

    this.props.deletePost(postID)
      .then(({ data }) => {
        this.props.data.refetch();
        this.setState({ deleteMessage: `${data.deletePost.title} berhasil dihapus.` },
         () => this.hideMessage()
        )
      })
  }
  mapPosts = (post) => {
    const slug = `/p/${post.slug}`;
    return (
      <div key={post.slug} className="post-detail">
        <h3><Link to={slug}>{post.title}</Link></h3>
        <p><Link to={slug}>{post.author}</Link></p>
        <p><button className="delete-post" onClick={this.handleDeletePost(post._id)}>Hapus</button></p>
      </div>
    );
  }

  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }

    return (
      <div className="home">
        <Helmet>
          <title>Home</title>
        </Helmet>
        {this.state.deleteMessage && (<p>{this.state.deleteMessage}</p>)}
        <div className="posts">{this.props.data.posts.map(this.mapPosts)}</div>
      </div>
    );
  }
}

const mapPropsToOptions = ({ mutate }) => ({
  deletePost: (postID) => mutate({ variables: { id: postID } })
})

export default compose(
  graphql(DeletePostMutation, { props: mapPropsToOptions }),
  graphql(PostQuery, { options: () => ({ fetchPolicy: 'network-only' }) })
)(Home);
