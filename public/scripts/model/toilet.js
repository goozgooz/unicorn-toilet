'use strict';

var app = app || {};

(function(module){

  //Toilet constructor
  function Toilet(toiletData){
    Object.keys(toiletData).forEach(key => this[key] = toiletData[key]);
  }

  //Array to hold toilets
  Toilet.all = [];

  //Info method
  Toilet.prototype.info = function(){
    this.info = '<h5>' + this.location + '</h5> <h6>' + this.overallQuality + '</h6> <h6>' + this.tpQuality + '</h6> <h6>' + this.usage + '</h6> <h6>' + this.occupancy + '</h6> <h6>' + this.genderNeutral + '</h6> <h6>' + this.drying + '</h6> <h6>' + this.comments + '</h6>';
  }

  //set toilet array to data from database
  Toilet.loadAll = function(rows){
    Toilet.all = rows.map(toilet => new Toilet(toilet));
  }

  //get data from database
  Toilet.fetchData = function(){
    $.get('/toilets')
      .then(results => {
        Toilet.loadAll(results);
      });
  };


  module.Toilet = Toilet;
})(app);
