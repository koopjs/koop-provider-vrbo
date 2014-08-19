var request = require('request'),
  BaseModel = require('koop-server/lib/BaseModel.js');

function VRBO( koop ){

  var vrbo = {};
  vrbo.__proto__ = BaseModel( koop );

  vrbo.getListings = function(bbox, options, callback){

    var key = [ bbox.minx, bbox.miny, bbox.maxx, bbox.maxy ].join('/'),
      type = 'vrbo';

    koop.Cache.get( type, key, options, function(err, entry ){
      if ( err ){
        console.log('Data not found in cache, requesting', key);
        request.get('http://www.vrbo.com/map-search-data/MapSearchData?minLat='+bbox.miny+'&minLong='+bbox.minx+'&maxLat='+bbox.maxy+'&maxLong='+bbox.maxx, function(err, data){
          var json = JSON.parse(data.body);
          if ( !json ){
            callback( 'No listings found', null );
          } else {
            var geojson = {type:'FeatureCollection', features: []};
            var feature;

            json.Listings.forEach(function(listing, i){
              feature = {type: 'Feature', id: i, geometry:{coordinates: [listing.Longitude, listing.Latitude], type:'Point'}};

              var props = {};
              props.UnitId = parseInt(listing.UnitId);
              props.PriceRange = listing.PriceRange;
              props.PriceInterval = listing.PriceInterval;
              props.Bedrooms = parseInt(listing.Bedrooms);
              props.Bathrooms = parseInt(listing.Bathrooms);
              props.Sleeps = parseInt(listing.Sleeps);
              props.NumberOfReviews = parseInt(listing.NumberofReviews);
              props.AverageReview = parseInt(listing.AverageReview);

              feature.properties = props; 
              geojson.features.push(feature);
            });
    
            if ( !geojson.length ){
              geojson = [ geojson ];
            } 
            koop.Cache.insert( type, key, geojson, 0, function( err, success){
              if ( success ) { 
                callback( null, geojson );
              }
            });
          }
        });
      } else {
        console.log('Data found!, using cache', key);
        callback( null, entry );
      }
    });

  };

  return vrbo;
};

module.exports = VRBO;
