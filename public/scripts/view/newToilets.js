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
      drying: this.drying,
      comments: this.comments
    })
  })
  .then(console.log);
};

newToilet.submit = function(event) {
  event.preventDefault();
  // let toilet = new newPooper(
  //   location: $('#location').val(),
  //   overallQuality: $('input[name=toilet]:checked', '#new-toilet').val(),
  //   tpQuality: $('input[name=tp]:checked', '#new-toilet').val(),
  //   usage: $('input[name=use]:checked', '#new-toilet').val(),
  //   occupancy: $('input[name=occupancy]:checked', '#new-toilet').val(),
  //   genderNeutral: $('input[name=gender]:checked', '#new-toilet').val(),
  //   soap: $('input[name=soap]:checked', '#new-toilet').val(),
  //   drying: $('input[name=drying]:checked', '#new-toilet').val(),
  //   comments: $('#comments').val(),
  // );
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
  console.log(toilet);

  toilet.insertRecord();
}

newToilet.handleForm = function(){
  $('#new-toilet').on('submit', newToilet.submit);
};

  newToilet.handleForm();

  module.NewPooper = NewPooper;
  module.newToilet = newToilet;


})(app);
