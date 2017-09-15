'use strict';

var app = app || {};

(function(module){

  //Toilet constructor
  function Toilet(toiletData){
    Object.keys(toiletData).forEach(key => this[key] = toiletData[key]);
  }

  //Array to hold toilets
  Toilet.all = [];

  Toilet.prototype.geocode = function(callback){
    var toilet = this;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address:this.location,
        key: 'AIzaSyByLJF7mtLoXCiyAiB0M6quGWfVERGhoZU',
      }
    })
    .then(function(res){
      var coords = res.data.results[0].geometry.location;
      callback(coords, toilet);
    })
    .catch(function(err){console.log(err);})
  }

  //set toilet array to data from database
  Toilet.loadAll = function(rows){
    Toilet.all = rows.map(toilet => new Toilet(toilet));
  }

  //get data from database
  Toilet.fetchData = function(callback){
    $.get('/toilets')
      .then(results => {
        Toilet.loadAll(results);
      })
      .then(callback);
  };



  module.Toilet = Toilet;
})(app);
