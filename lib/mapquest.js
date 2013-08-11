var get = require( 'superagent' ).get;

var url = 'http://open.mapquestapi.com/geocoding/v1';

var batch = exports.batch = function(addresses, callback) {
  var batch = get(url + '/batch');
  for (var i = 0; i < addresses.length; i++) {
    batch.query({ location: addresses[i] });
  }
  batch.end(callback);
};

exports.processCoordinates = function( artists, callback ) {

  var addresses = [];
  artists.forEach( function( artist ) {
    if ( artist.hasOwnProperty( 'artist_location') ) {
      if ( artist.artist_location.hasOwnProperty( 'location' ) ) {
        if ( addresses.indexOf( artist.artist_location.location ) == -1 ) {
          addresses.push( artist.artist_location.location );
        }
      }
    }
  } );

  batch( addresses, function( error, response ) {

    if ( error ) { callback( error, response ); return; }

    var found = {};
    response.res.body.results.forEach( function( item ) {
      if ( item && item.hasOwnProperty( 'providedLocation' ) && item.providedLocation.hasOwnProperty( 'location' ) ) {
        if ( item.locations.length == 1 ) {
          found[ item.providedLocation.location ] = item.locations[0].latLng;
        } else {
          console.log( "%s has %d locations.", item.providedLocation, item.locations.length );
        }
      }
    });
    callback( error, found );

  });

}