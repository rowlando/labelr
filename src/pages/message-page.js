import React from 'react';
import NavHelper from '../components/nav-helper';

const Error = React.createClass({

  render () {
    return (
      <NavHelper className='container'>
        <header role='banner'>
          <h1>{this.props.title}</h1>
        </header>
        <div>
        <p>{this.props.body}</p>
        </div>
      </NavHelper>
    )
  }

});

export default Error;
