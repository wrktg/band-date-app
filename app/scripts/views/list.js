App.SearchResultsView = Ember.ListView.extend( App.DOM.ResizableElement, {
  itemViewClass:  App.ListItemView,
  contentBinding: 'controller',
  height:         100,
  width:          500,
  rowHeight:      250,
  elementWidth:   150,
  didInsertElement: function() {
    this._super();
    this.updateWidth();
    this.updateHeight();
    App.DOM.content.addObserver('width', this,  'updateWidth');
    App.DOM.content.addObserver('height', this, 'updateHeight');
  },
  updateWidth: function() {
    var width = App.DOM.content.get('width');
    this.set( 'width', width );
    this.$().width(width);
  },
  updateHeight: function() {
    var height = App.DOM.content.get('height');
    this.set( 'height', height );
    this.$().height(height);
  }
});

