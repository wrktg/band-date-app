'use strict';

exports.init = function() {

  var
    argo      = require( 'argo' ),
    url       = require( 'url' ),
    echonestClient  = require( './echonest' ),
    mapquestClient = require( './mapquest' );

  var myNest = new echonest.Echonest({
    api_key: 'BEGIZOYRXJLA38XO5'
  });

  argo()
    .get('/different', function(handle) {
      handle( 'request', function( env, next ) {
        console.log( 'executing different request' );
        next( env );
      });
    })
    .use(function(handle) {
      handle('similar#request', function(env, next) {
        var parsed = url.parse( env.request.url, true );

        if ( parsed.query.name ) {
          env.response.statusCode = 200;
          env.response.body = {
            status: {
              code: 0,
              message: "Success"
            }
          }
          console.log( '/similar to %s', parsed.query.name );
        } else {
          env.response.statusCode = 400;
          env.response.body = {
            status: {
              code: 1,
              message: "You must specify a name parameter"
            }
          }
          console.error( '/similar without name parameter' );
        }

        next(env);
      });
    })
    .use(function(handle) {
      handle('response', function(env, next) {
        console.log( 'Go get artists' );
        next(env);
      });
    })
    .use(function(handle) {
      handle('response', function(env, next) {
        console.log( 'Looking up GeoCoordinates' );
        next(env);
      });
    })
    .get('/similar', function(handle) {
      handle( 'request', function( env, next ) {
        console.log( '/similar#request' );
        env.pipeline('similar#request').siphon(env, next);
      });
      handle( 'response', function( env, next ) {
        console.log( '/similar#response' );
        next(env);
      });
    })
    .listen(1337);
};
