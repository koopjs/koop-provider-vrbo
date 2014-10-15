var extend = require('node.extend'),
  BaseController = require('koop-server/lib/BaseController.js');

var Controller = function( vrbo ){

  var controller = {};
  controller.__proto__ = BaseController( );

  controller.index = function(req, res){
    res.render(__dirname + '/../views/index');
  };
  
  controller.get = function(req, res){
    vrbo.getListings(req.params, req.query, function(err, listings){
      res.json(listings);
    });
  };
  
  controller.featureserver = function(req, res){
      var callback = req.query.callback, self = this;
      delete req.query.callback;
  
      for (var k in req.body){
        req.query[k] = req.body[k];
      }
  
      vrbo.getListings(req.params, req.query, function( err, data){
        controller.processFeatureServer( req, res, err, data, callback);
      });
  };
  
  // Handle the preview route 
  // renders views/demo/github 
  controller.preview = function(req, res){
    res.render(__dirname + '/../views/demo', { locals: { 
      minx: req.params.minx, 
      miny: req.params.miny, 
      maxx: req.params.maxx, 
      maxy: req.params.maxy } 
    });
  };

  return controller;

};
module.exports = Controller;
