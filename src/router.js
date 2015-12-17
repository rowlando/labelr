import app from 'ampersand-app';
import Router from 'ampersand-router';
import qs from 'qs';
import xhr from 'xhr';
import React from 'react';
import ReactDom from 'react-dom';
import Layout from './layout.js';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import MessagePage from './pages/message-page';
import NavHelper from './components/nav-helper';
import RepoDetail from './pages/repo-detail';
import config from './config';

function auth (name) {
  return function () {
    if (app.me.token) {
      this[name].apply(this, arguments);
    } else {
      this.redirectTo('/');
    }
  }
}

export default Router.extend({

  renderPage (page, opts = { layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      );
    }
    ReactDom.render(page, document.getElementById('root'));
  },

  routes: {
    '': 'public',
    'repos': auth('repos'),
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': auth('repoDetail'),
    'auth/callback?:query': 'authCallback',
    '*error': 'error'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false});
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos} />);
  },

  error () {
    this.renderPage(<MessagePage title='Not found' body='sorry not here' />);
  },

  repoDetail (owner, repoName) {
    const repo = app.me.repos.getByFullname(owner + '/' + repoName);
    this.renderPage(<RepoDetail repo={repo} labels={repo.labels}/>);
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' +
      qs.stringify({
        client_id: config.clientId,
        redirect_url: window.location.origin + '/auth/callback',
        scope: 'user,repo'
      });
  },

  authCallback (query) {
    query = qs.parse(query);
    xhr({
      url: config.authUrl + '/' + query.code,
      json: true
    },(err, request, body) => {
      app.me.token = body.token;
      this.redirectTo('/repos');
    });

    this.renderPage(<MessagePage title='Loading' body='Fetching repos' />);
  },

  logout () {
    window.localStorage.clear();
    window.location = '/';
  }

});
