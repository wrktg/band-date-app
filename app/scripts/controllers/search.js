App.SearchController = Ember.Controller.extend({
  artistName : null,
  search: function( evn ) {
    debugger;
    this.transitionToRoute( 'search.results', {
      artist_name: this.get( 'artistName' )
    })
  }
});