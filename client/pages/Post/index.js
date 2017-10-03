import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import Loader from '../../components/Loader';
import PostQuery from './postQuery.graphql';
import UpdatePostMutation from './updatePost.graphql';

import './styles.css';
class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      editPost: false,
      error: null,
      form: {
        title: '',
        author: '',
        body: ''
      }
    }
  }

  componentWillReceiveProps ({ data }) {
    if (!isEqual(data.post, this.props.data.post)) {
      this.setState({
        ...this.state,
        form: {
          title: data.post.title,
          author: data.post.author,
          body: data.post.body,
        }
      })
    }
  }

  handleToggleEdit = () => this.setState({ editPost: !this.state.editPost })

  handleChange = type => ({ target }) => {
    this.setState({
      error: null,
      form: {
        ...this.state.form,
        [type]: target.value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, body } = this.state.form;
    const data = {
      ...this.state.form,
      id: this.props.data.post._id
    }

    this.props.editPost(data)
      .then(() => {
        this.setState({
          success: 'Data has been updated',
          form: {
            title: '',
            author: '',
            body: ''
          }
        })
      });
  }

  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }

    const { post } = this.props.data;
    const { form } = this.state;

    const formElement = (
      <div className="form-group">
        {this.state.success && <p className="msg-success">{this.state.success}</p>}
        {this.state.error && <p className="msg-fail">{this.state.error}</p>}
        
        <div>
          <button className="edit-post-btn" onClick={this.handleToggleEdit}>Back</button>
        </div>
        
        <form onSubmit={this.handleSubmit}>
          <div><label htmlFor="title">Title:</label><input type="text" defaultValue={form.title} onChange={this.handleChange('title')} /></div>
          <div><label htmlFor="author">Author:</label><input type="text" defaultValue={form.author} onChange={this.handleChange('author')} /></div>
          <div><label htmlFor="body">Content:</label><textarea onChange={this.handleChange('body')} defaultValue={form.body} /></div>
          <div><button type="submit">Edit Post</button></div>
        </form>
      </div>
    );
    
    const postElement = (
      <div className="post-detail">
        <div className="edit-button">
          <button className="edit-post-btn" onClick={this.handleToggleEdit}>Edit</button>
        </div>

        <h3>{post.title}</h3>
        <div className="author">{post.author}</div>
        <div className="content">
          <p>{post.body}</p>
        </div>
      </div>
    );

    return this.state.editPost ? formElement : postElement;
  }
}

const mapPropsToOptions = ({ match }) => ({
  variables: {
    slug: match.params.slug
  }
});

export default compose(
  graphql(PostQuery, { options: mapPropsToOptions }),
  graphql(UpdatePostMutation, {
    props: ({ mutate }) => ({
      editPost: (newPostData) => mutate({ variables: newPostData })
    }),
  })
)(Post);
