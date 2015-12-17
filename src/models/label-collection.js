import Collection from 'ampersand-rest-collection';
import Label from './label';
import githubMixin from '../helpers/github-mixin';

export default Collection.extend(githubMixin, {

  url () {
    return 'https://api.github.com/repos/' + this.parent.full_name + '/labels'
  },

  model: Label
});
