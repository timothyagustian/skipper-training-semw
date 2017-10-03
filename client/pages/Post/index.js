import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import Loader from '../../components/Loader';

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
    
  }

  handleToggleEdit = () => this.setState({ editPost: !this.state.editPost })

  handleChange = type => ({ target }) => {
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const post = { title: null, author: null, body: null };
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

export default Post;
