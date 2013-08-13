'use strict';

var
  argo      = require( 'argo' ),
  similar   = require( './similar' );

exports.run = function( options ) {

  argo()
    .get('/different', function(handle) {
      handle( 'request', function( env, next ) {
        console.log( 'executing different request' );
        next( env );
      });
    })
    .use( function( handle ) {
      handle( 'similar#request', similar.verifyParameters );
    })
    .use( function( handle ) {
      handle('similar#request', similar.getArtists );
    })
    .use( function( handle ) {
      handle('similar#request', similar.getCoordinates );
    })
    .get('/similar', function(handle) {
      handle( 'request', function( env, next ) {
        env.pipeline('similar#request').siphon(env, next);
      });
    })
    .use( function( handle ) {
      handle( 'response', function( env, next ) {
        delete env.response.body['status'];
        next( env );
      });
    })
    .listen( options.port, options.ip );

};
