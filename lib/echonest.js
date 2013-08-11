echonest  = require( 'echonest' );

var myNest = new echonest.Echonest({
  api_key: 'BEGIZOYRXJLA38XO5'
});

exports.similar = function( name, callback ) {
  myNest.artist.similar({
    name: name,
    results: 100,
    bucket: [
      "doc_counts", "familiarity", "hotttnesss", "images", "artist_location", "news", "reviews", "songs", "terms", "urls", "video", "years_active", "id:facebook"
    ]
  }, callback );
}