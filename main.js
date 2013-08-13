#!/usr/bin/env node

var
  pkg = require('./package.json' ),
  env = process.env.ENV || 'development';

require( './lib/server' ).run( pkg[ "apps" ][ env ] );