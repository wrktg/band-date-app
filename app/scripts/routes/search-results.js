App.SearchResultsRoute = Ember.Route.extend({
  model: function( params ) {
    debugger;
    return this.session.remoteCall( App.Artist, 'similar', {
      name: params.artist_name
    } );
  },
  serialize: function( params ) {
    return { artist_name: params.artist_name }
  }
});