var extend = require('node.extend');

// inherit from base controller
var Controller = extend( {}, BaseController );

Controller.provider = true,
Controller.index = function(req, res){
  res.render(__dirname + '/../views/index');
};

Controller.get = function(req, res){
  vrbo.getListings(req.params, req.query, function(err, listings){
    res.json(listings);
  });
};

Controller.featureservice = function(req, res){
    var callback = req.query.callback, self = this;
    delete req.query.callback;

    for (var k in req.body){
      req.query[k] = req.body[k];
    }

    console.log(req.body);

    vrbo.getListings(req.params, req.query, function( err, data){
      Controller._processFeatureServer( req, res, err, data, callback);
    });
};

// Handle the preview route 
// renders views/demo/github 
Controller.preview = function(req, res){
  res.render(__dirname + '/../views/demo', { locals: { 
    minx: req.params.minx, 
    miny: req.params.miny, 
    maxx: req.params.maxx, 
    maxy: req.params.maxy } 
  });
};

module.exports = Controller;
