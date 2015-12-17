const config = {

  'localhost': {
    authUrl: 'https://labelrowlando.herokuapp.com/authenticate',
    clientId: '5c32617ea1d30557c15c'
  },

  'rowlando.surge.sh': {
    authUrl: 'https://labelrowlando-prod.herokuapp.com/authenticate',
    clientId: 'ca550d865a8ceb544a8b'
  }

}[location.hostname];

export default config;
