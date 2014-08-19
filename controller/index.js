var extend = require('node.extend'),
  BaseController = require('koop-server/lib/Controller.js');

var Controller = function( vrbo ){

  this.index = function(req, res){
    res.render(__dirname + '/../views/index');
  };
  
  this.get = function(req, res){
    vrbo.getListings(req.params, req.query, function(err, listings){
      res.json(listings);
    });
  };
  
  this.featureserver = function(req, res){
      var callback = req.query.callback, self = this;
      delete req.query.callback;
  
      for (var k in req.body){
        req.query[k] = req.body[k];
      }
  
      vrbo.getListings(req.params, req.query, function( err, data){
        BaseController._processFeatureServer( req, res, err, data, callback);
      });
  };
  
  // Handle the preview route 
  // renders views/demo/github 
  this.preview = function(req, res){
    res.render(__dirname + '/../views/demo', { locals: { 
      minx: req.params.minx, 
      miny: req.params.miny, 
      maxx: req.params.maxx, 
      maxy: req.params.maxy } 
    });
  };

  return this;

};
module.exports = Controller;
