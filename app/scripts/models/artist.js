var attr = Ep.attr;

App.Artist = Ep.Model.extend({
  id: attr(),
  name: attr(),
  docCounts: attr(),
  reviews: attr(),
  urls: attr(),
  images: attr(),
  artistLocation: attr(),
  songs: attr(),
  videos: attr()
});