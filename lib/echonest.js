echonest  = require( 'echonest' );

var myNest = new echonest.Echonest({
  api_key: 'BEGIZOYRXJLA38XO5'
});

exports.similar = function( name, callback ) {
  myNest.artist.similar({
    name: name,
    results: 100,
    bucket: [
      "doc_counts", "images", "artist_location", "songs", "terms", "urls", "video", "years_active", "id:facebook"
    ]
  }, callback );
}