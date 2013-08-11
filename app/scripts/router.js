App.Router.map(function(){

  this.resource( 'search', { path: '/' }, function() {
    this.route( 'results', { path: 'similar/to/:artist_name' } );
  });

});