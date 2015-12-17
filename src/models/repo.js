import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import LabelCollection from './label-collection';

export default Model.extend(githubMixin, {

  initialize () {
    this.listenTo(this.labels, 'sync', () => {
      this.fetchedLabels = true
    })
  },

  url () {
    return 'https://api.github.com/repos/' + this.full_name;
  },

  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  },

  derived: {
    appUrl: {
      deps: ['full_name'],
      fn () {
        return '/repo/' + this.full_name
      }
    }
  },

  session: {
    fetchedLabels: {
      type: 'boolean',
      default: false
    }
  },

  collections: {
    labels: LabelCollection
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments);
    this.labels.fetch();
  }

});
