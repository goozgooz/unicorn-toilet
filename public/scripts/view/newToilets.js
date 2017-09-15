'use strict';

var app = app || {};

(function(module){

const newToilet = {};

function NewPooper(location, overallQuality, tpQuality, usage, occupancy, genderNeutral, soap, drying, comments){
  this.location = location;
  this.overallQuality = overallQuality;
  this.tpQuality = tpQuality;
  this.usage = usage;
  this.occupancy = occupancy;
  this.genderNeutral = genderNeutral;
  this.soap = soap;
  this.drying = drying;
  this.comments = comments;
}

NewPooper.prototype.geocode = function(callback){
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:this.location,
      key: 'AIzaSyByLJF7mtLoXCiyAiB0M6quGWfVERGhoZU',
    }
  })
  .then(function(res){
    var coords = res.data.results[0].geometry.location;
    callback(coords);
  })
  .catch(function(err){console.log(err);})
}

NewPooper.prototype.insertRecord = function() {
  $.ajax({
    url: '/toilets',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      location: this.location,
      overallQuality: this.overallQuality,
      tpQuality: this.tpQuality,
      usage: this.usage,
      occupancy: this.occupancy,
      genderNeutral: this.genderNeutral,
      soap: this.soap,
      drying: this.drying,
      comments: this.comments
    })
  })
  .then(console.log);
};

newToilet.submit = function(event) {
  event.preventDefault();
  let toilet = new NewPooper(
    $('#location').val(),
    $('input[name=toilet]:checked', '#new-toilet').val(),
    $('input[name=tp]:checked', '#new-toilet').val(),
    $('input[name=use]:checked', '#new-toilet').val(),
    $('input[name=occupancy]:checked', '#new-toilet').val(),
    $('input[name=gender]:checked', '#new-toilet').val(),
    $('input[name=soap]:checked', '#new-toilet').val(),
    $('input[name=drying]:checked', '#new-toilet').val(),
    $('#comments').val(),
  );
  toilet.geocode(addMarker);

  toilet.insertRecord();

  $('.toilet-form').hide();
  $('.mainContent').fadeIn();
  //TODO function to reload all the data from DB back into map

}

newToilet.handleForm = function(){
  $('#new-toilet').on('submit', newToilet.submit);
};

newToilet.handleForm();

  module.NewPooper = NewPooper;
  module.newToilet = newToilet;


})(app);
