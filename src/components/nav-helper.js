import app from 'ampersand-app';
import localLinks from 'local-links';
import React from 'react';

export default React.createClass({

  clickHandler (event) {
    const pathname = localLinks.getLocalPathname(event);
    if (pathname) {
      event.preventDefault();
      app.router.history.navigate(pathname);
    }
  },

  render () {
    return (
      <div {...this.props} onClick={this.clickHandler}>
        {this.props.children}
      </div>
    );
  }

});
