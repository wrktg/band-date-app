/*global Ember, DS */

var config = window.config;

var App = window.App = Ember.Application.create( config.Application );

/* Order and include as you please. */
require('scripts/models/*');
require('scripts/mixins/*');
require('scripts/controllers/*');
require('scripts/controllers/*/*');
require('scripts/routes/*');
require('scripts/routes/*/*');
require('scripts/utils/*');
require('scripts/views/*');
require('scripts/views/*/*');
require('scripts/views/*/*/*');
require('scripts/router');