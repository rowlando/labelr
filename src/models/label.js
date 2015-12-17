import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import xhr from 'xhr';

export default Model.extend(githubMixin, {

  idAttribute: 'name',

  props: {
    name: 'string',
    color: {
      type: 'string',
      default: '000000'
    }
  },

  session: {
    editing: {
      type: 'boolean',
      default: false
    },
    saved: {
      type: 'boolean',
      default: true
    }
  },

  isNew () {
    return !this.saved;
  },

  update (attributes) {
    const oldAttributes = this.toJSON();
    xhr({
      url: this.url(),
      json: attributes,
      method: 'PATCH',
      headers: {
        Authorization: 'token ' + app.me.token
      }
    }, (err, req, body) => {
      if (err) {
        this.set(oldAttributes);
        console.log('error on saving');
      }
      else {
        this.saved = true;
      }
    });
    this.set(attributes);
  }

});
