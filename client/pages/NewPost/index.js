import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { graphql } from 'react-apollo';

import Loader from '../../components/Loader';
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
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
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

export default NewPost;
