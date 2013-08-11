App.SearchResultsController = Ember.ArrayController.extend({
  search: null,
  needs: 'search',
  searchBinding: 'controllers.search'
});