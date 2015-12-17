import app from 'ampersand-app';
import React from 'react';

const Public = React.createClass({

  displayName: 'PublicPage',

  onLoginClick (event) {
    event.preventDefault();
    app.router.history.navigate('/login');
  },

  render () {
    return (
      <div className='container'>
        <header role='banner'>
          <h1>HubTags</h1>
        </header>
        <div>
          <p>Open source app for managing your tags (labels) on GitHub.com. Built with Ampersand.js and React. Thanks to <a href='http://twitter.com/henrikjoreteg'>@HenrikJoreteg</a> - I followed his workshop on Frontend masters.</p>
          <p>Source <a href='https://github.com/rowlando/hubtags'>available on GitHub</a>.</p>
          <a href='/login' className='button button-large'>
            <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
          </a>
        </div>
      </div>
    )
  }

});

export default Public;
