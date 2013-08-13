App.SearchResultsRoute = Ember.Route.extend({
  model: function( params ) {
    debugger;
    return this.session.remoteCall( null, 'similar', {
      name: params.artist_name
    } );
  },
  afterModel: function( model, transition ) {
    debugger;
  },
  serialize: function( params ) {
    return { artist_name: params.artist_name }
  }
});