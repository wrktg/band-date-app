var attr = Ep.attr;

App.Artist = Ep.Model.extend( {
  artistLocation : attr( 'object' ),
  docCounts : attr( 'object' ),
  images : attr( 'array' ),
  name : attr( 'string' ),
  reviews : attr( 'array' ),
  urls : attr( 'array' ),
  songs : attr( 'array' ),
  video : attr( 'array' ),
  yearsActive : attr( 'array' ),
  terms : attr( 'array' )
} );