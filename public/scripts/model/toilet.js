'use strict';

var app = app || {};

(function(module){

  //Toilet constructor
  function Toilet(toiletData){
    Object.keys(toiletData).forEach(key => this[key] = toiletData[key]);
  }

  //Array to hold toilets
  Toilet.all = [];

  Toilet.prototype.geocode = function(){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address:this.location,
        key: 'AIzaSyByLJF7mtLoXCiyAiB0M6quGWfVERGhoZU',
      }
    })
    .then(function(res){
      return (res.data.results[0].geometry.location);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  //Info method
  Toilet.prototype.info = function(){
    this.info = '<h5>' + this.location + '</h5> <h6>' + this.overallQuality + '</h6> <h6>' + this.tpQuality + '</h6> <h6>' + this.usage + '</h6> <h6>' + this.occupancy + '</h6> <h6>' + this.genderNeutral + '</h6> <h6>' + this.drying + '</h6> <h6>' + this.comments + '</h6>';
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
