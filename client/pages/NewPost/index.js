import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { graphql } from 'react-apollo';

import Loader from '../../components/Loader';
import AddPostMutation from './addPost.graphql';
import './styles.css';

class NewPost extends Component {
  state = {
    error: null,
    success: null,
    form: {
      title: '',
      author: '',
      body: '',
    }
  }

  handleChange = type => ({ target }) => {
    this.setState({
      ...this.state,
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

    if (title && author && body) {
      this.props.addNewPost(this.state.form)
        .then(() => {
          this.setState({
            success: 'Data has been added',
            form: {
              title: '',
              author: '',
              body: ''
            }
          })
        });
    } else {
      this.setState({
        error: 'Form can not be blank.'
      });
    }
  }

  render() {
    const { title, author, body } = this.state.form;

    return (
      <div className="form-group">
        {this.state.success && <p className="msg-success">{this.state.success}</p>}
        {this.state.error && <p className="msg-fail">{this.state.error}</p>}

        <form onSubmit={this.handleSubmit}>
          <div><label htmlFor="title">Title:</label><input type="text" value={title} onChange={this.handleChange('title')} /></div>
          <div><label htmlFor="author">Author:</label><input type="text" value={author} onChange={this.handleChange('author')} /></div>
          <div><label htmlFor="body">Content:</label><textarea onChange={this.handleChange('body')} value={body} /></div>
          <div><button type="submit">Add New Post</button></div>
        </form>
      </div>
    );
  }
}

export default graphql(AddPostMutation, {
  props: ({ mutate }) => ({
    addNewPost: (newPostData) => mutate({ variables: newPostData })
  }),
})(NewPost);
