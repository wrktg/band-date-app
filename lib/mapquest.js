var get = require( 'superagent' ).get;

var url = 'http://mapquestapi.com/geocoding/v1';
var key = 'Fmjtd%7Cluub25u22l%2Cb5%3Do5-9u8xda';

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

  get( url + '/batch', { location: addresses, key: key } ).end(function( error, response ) {

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