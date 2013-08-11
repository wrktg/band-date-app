var
  url = require( 'url' ),
  echonestClient = require( './echonest' ),
  mapquestClient = require( './mapquest' );

var setError = function( env, message ) {
  env.response.statusCode = 500;
  env.response.body.status = {
    code : 1,
    message : message
  }
}

exports.getArtists = function ( env, next ) {
  // true means error occured
  if ( env.response.body.status.code ) { next( env ); return; }

  echonestClient.similar( env.request.query.name,
    function ( error, response ) {
      if ( error ) {
        setError( env, error );
        env.response.body.artists = {};
        next( env );
      }
      env.response.body.artists = response.artists;
      next( env );
    }
  );
}

exports.getCoordinates = function ( env, next ) {
  // true means error occured
  if ( env.response.body.status.code ) { next( env ); return; }

  mapquestClient.processCoordinates( env.response.body.artists,
    function ( error, response ) {
      if ( error ) {
        setError( env, error );
        next( env );
      }
      env.response.body.artists.map( function ( item ) {
        if ( item.hasOwnProperty( 'artist_location' ) ) {
          if ( item.artist_location.hasOwnProperty( 'location' ) ) {
            if ( response.hasOwnProperty( item.artist_location.location ) ) {
              item.artist_location.latLng = response[ item.artist_location.location ];
            } else {
              console.log( "%s does't have a location", item.name );
            }
          } else {
            item.artist_location.error = "Latitude and Longitude could not be found;"
          }
        }
        return item;
      } );
      next( env );
    }
  );
}

exports.verifyParameters = function ( env, next ) {
  var parsed = url.parse( env.request.url, true );

  if ( parsed.query.name ) {
    env.response.statusCode = 200;
    env.response.body = {
      status : {
        code : 0,
        message : "Success"
      }
    }
    env.request.query = parsed.query;
    console.log( '/similar to %s', parsed.query.name );
  } else {
    env.response.statusCode = 400;
    env.response.body = {
      status : {
        code : 1,
        message : "You must specify a name parameter"
      }
    }
    console.error( '/similar without name parameter' );
  }

  next( env );
}