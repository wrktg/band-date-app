/*global Ember, DS */

var config = window.config;

var App = window.App = Ember.Application.create( config.Application );

App.reopen({
  "rootElement": "#app"
});

App.Adapter = Ep.RestAdapter.extend({
  url: '/api',
  remoteCall: function(context, name, params) {
    var url, adapter = this;
    if ( context ) {
      if(typeof context === "string") {
        context = this.lookupType(context);
      }
      if(typeof context === 'function') {
        url = this.buildURL(this.rootForType(context));
      } else {
        var id = context.get( 'id' );
        Ember.assert("Cannot perform a remote call with a context that doesn't have an id", id);
        url = this.buildURL(this.rootForType(context.constructor), id);
      }
    } else {
      url = this.get( 'url' );
    }

    url = url + '/' + name;

    // TODO: serialize models passed in the params
    var data = params;

    var method = "GET";
    return this.ajax(url, method,{
      data: data
    }).then(function(json){
        return Ember.run(adapter, 'didReceiveDataForRpc', json, context);
      }, function(xhr) {
        throw Ember.run(adapter, 'didError', xhr, context);
      });
  },
  didReceiveDataForRpc: function( data, targetModel ) {
    var result = [];
    this.processData(data, function (model) {
      if ( Em.isNone( targetModel ) ) {
        result.push( model );
      } else {
        if (targetModel && model.isEqual(targetModel)) {
          result = model;
        }
      }
    });
    if ( Em.isArray( result ) && result.length === 1 ) {
      result = result[0];
    } else {
      result = Ember.ArrayProxy.create( { content: result } )
    }
    return result;
  },
  processData: function (data, callback, binding) {
    var models = this.get('serializer').deserialize(data);
    models.forEach(function (model) {
      this.willLoadModel(model);
    }, this);
    models.forEach(function (model) {
      this.didLoadModel(model);
      callback.call(binding || this, model);
    }, this);
    this.materializeRelationships(models);
  }
});

App.Serializer = Ep.RestSerializer.extend();

App.Adapter.registerTransform( 'array', {
  deserialize: function(x) {
    return Em.isNone(x) ? [] : x;
  },
  serialize: function(x) {
    if (Em.isNone(x)) {
      return [];
    } else {
      return x;
    }
  }
});

App.Adapter.registerTransform( 'object', {
  deserialize: function(x) {
    return Em.Object.create(Em.isNone(x) ? {} : x);
  },
  serialize: function(x) {
    if (Em.isNone(x)) {
      return {};
    } else {
      return x;
    }
  }
});

App.Adapter.registerEnumTransform( )

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