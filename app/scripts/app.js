/*global Ember, DS */

var config = window.config;

var App = window.App = Ember.Application.create( config.Application );

App.reopen({
  "rootElement": "#app"
});

App.Adapter = Ep.RestAdapter.extend({
  url: "http://developer.echonest.com/api/v4",
  remoteCall: function(context, name, params) {
    var url, adapter = this;
    if(typeof context === "string") {
      context = this.lookupType(context);
    }
    if(typeof context === 'function') {
      url = this.buildURL(this.rootForType(context));
    } else {
      var id = get(context, 'id');
      Ember.assert("Cannot perform a remote call with a context that doesn't have an id", id);
      url = this.buildURL(this.rootForType(context.constructor), id);
    }

    url = url + '/' + name;

    // TODO: serialize models passed in the params
    var data = params;

    debugger;

    var method = "GET";
    return this.ajax(url, method,{
      data: data
    }).then(function(json){
        return Ember.run(adapter, 'didReceiveDataForRpc', json, context);
      }, function(xhr) {
        throw Ember.run(adapter, 'didError', xhr, context);
      });
  }
});

App.Serializer = Ep.RestSerializer.extend({

});

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