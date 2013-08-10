FS.DOM = Ember.Namespace.create({
  window: null
});

/**
 * Wrapper for DOM's window object allows to use Ember events when hooking the DOM
 * @type {Object.extend|*}
 */
FS.DOM.Window = Ember.Object.extend( Ember.Evented, {
  resizeTimer: null,
  init: function() {
    this._super();
    var object = this;
    return Ember.$(window).on('resize', function() {
      window.clearTimeout(object.get('resizeTimer'));
      object.set( 'resizeTimer', setTimeout(function(){ object.trigger('resize') }, 100) );
      return true;
    });
  },
  $: function() {
    return Ember.$(window);
  }
});


FS.DOM.Element = Ember.Object.extend( Ember.Evented, {
  el:       null,
  width:    null,
  height:   null,
  init: function() {
    this._super();
    FS.DOM.window.on( 'resize', this, 'resized' );
  },
  /**
   * Update width & height properties and fire resize event
   */
  resized: function () {
    var newWidth = this.$().width();
    var oldWidth = this.get('width');
    var newHeight = this.$().height();
    var oldHeight = this.get('height');

    args = {
      oldWidth: oldWidth,
      oldHeight: oldHeight,
      newWidth: newWidth,
      newHeight: newHeight
    };

    var widthChanged  = newWidth != oldWidth;
    var heightChanged = newHeight != oldHeight;

    if ( widthChanged ) {
      this.set( 'width', newWidth );
    }

    if ( heightChanged ) {
      this.set( 'height', newHeight );
    }

    if ( widthChanged || heightChanged ) {
      this.trigger('resize', args );
      this.set( 'height', newHeight );
    }
  },
  $: function() {
    return this.el
  }
});

/**
 * Triggers resize event if this views element is resized
 * @type {Object.extend|*}
 */
FS.DOM.ResizableElement = Ember.Mixin.create( FS.DOM.Element, {} );
FS.DOM.window = FS.DOM.Window.create({});