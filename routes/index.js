module.exports = {
  'get /vrbo': 'index',
  'get /vrbo/:minx/:miny/:maxx/:maxy': 'get',
  'post /vrbo/:minx/:miny/:maxx/:maxy/FeatureServer': 'featureserver',
  'post /vrbo/:minx/:miny/:maxx/:maxy/FeatureServer/:layer': 'featureserver',
  'post /vrbo/:minx/:miny/:maxx/:maxy/FeatureServer/:layer/:method': 'featureserver'
};
