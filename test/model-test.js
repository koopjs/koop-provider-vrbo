var should = require('should'),
  config = require('config'),
  koopserver = require('koop-server')(config); 

global.config = config;

var id = 'id';

before(function (done) {
  global['vrbo'] = require('../models/vrbo.js');
  done();
});

describe('VRBO Model', function(){

    describe('when finding a data', function(){
      before(function(done ){
        // connect the cache
        Cache.db = PostGIS.connect( config.db.postgis.conn );
        done();
      });

      afterEach(function(done){
        done();
      });
    
      it('should find and return the data', function(done){
        var bbox = {
          minx: -116.997,
          miny: 34.225,
          maxx: 34.265,
          maxy: -116.785
        };
        vrbo.getListings(bbox, {}, function(err, data){
          should.not.exist(err);
          should.exist(data);
          done();
        });
      });

    });

});

