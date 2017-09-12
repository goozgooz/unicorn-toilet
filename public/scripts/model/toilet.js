'use strict';

var app = app || {};

(function(module){

  //Toilet constructor
  function Toilet(toiletData){
    Object.keys(toiletData).forEach(key => this[key] = toiletData[key]);
  }

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
