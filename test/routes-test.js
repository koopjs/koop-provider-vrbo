var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config);

global.config = config;

before(function (done) {
    Cache.db = PostGIS.connect( config.db.postgis.conn );
    try { koop.register(require("../index.js")); } catch(e){ console.log(e)}
    done(); 
});

describe('Koop Routes', function(){

    describe('/vrbo', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/vrbo')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('/vrbo/-116.997/34.225/-116.785/34.265', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/vrbo/-116.997/34.225/-116.785/34.265')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

    describe('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0/query', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/vrbo/-116.997/34.225/-116.785/34.265/FeatureServer/0/query')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
    });

});

