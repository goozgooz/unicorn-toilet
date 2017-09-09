'use strict';

var app = app || {};

(function(module){

  //Toilet constructor
  function Toilet(toiletData){
    Object.keys(toiletData).forEach(key => this[key] = toiletData[key]);
  }
  // function Toilet(location, paperQuality, oneToilet, multipleToilets, foamSoap, gelSoap, paperTowels, airDry, genderNeutral, free, pay){
  //   this.location = location;
  //   this.paperQuality = paperQuality;
  //   this.oneToilet = oneToilet;
  //   this.multipleToilets = multipleToilets;
  //   this.foamSoap = foamSoap;
  //   this.gelSoap = gelSoap;
  //   this.paperTowels = paperTowels;
  //   this.airDry = airDry;
  //   this.genderNeutral = genderNeutral;
  //   this.free = free;
  //   this.pay = pay;
  // };

  //Array to hold toilets
  Toilet.all = [];

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
