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
    .get('/similar', function(handle) {
      handle('request', function(env, next) {
        var parsed = url.parse( env.request.url, true );

        if ( parsed.query.name ) {
          env.response.statusCode = 200;

          var artists = [];
          echonestClient.similar( parsed.query.name,
            function (error, response) {
              if ( error ) {
                env.response.statusCode = 400;
                env.response.body = {
                  data: [ error, response  ],
                  success: false
                }
                return ;
              }

              artists = response.artists;
              mapquestClient.processCoordinates( artists,
                function( error, response ) {
                  if ( error ) { console.log( error ); return; }
                  artists.map( function( item ) {
                    if ( item.hasOwnProperty( 'artist_location') ) {
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
                  })

                });

            }
          );
        } else {
          env.response.statusCode = 400;
          env.response.body = {
            data: [ 'You must specify a name parameter'],
            success: false
          }
        }
        next(env);
      });
    })
    .listen(1337);

};
