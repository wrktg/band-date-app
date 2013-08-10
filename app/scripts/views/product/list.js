App.ListView = Ember.ListView.extend( FS.DOM.ResizableElement, {
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
    FS.DOM.content.addObserver('width', this,  'updateWidth');
    FS.DOM.content.addObserver('height', this, 'updateHeight');
  },
  updateWidth: function() {
    var width = FS.DOM.content.get('width');
    this.set( 'width', width );
    this.$().width(width);
  },
  updateHeight: function() {
    var height = FS.DOM.content.get('height');
    this.set( 'height', height );
    this.$().height(height);
  }
});

