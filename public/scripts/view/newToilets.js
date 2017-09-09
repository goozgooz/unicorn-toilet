'use strict';

var app = app || {};

(function(module){

const newToilet = {};

newToilet.handleForm = function(){
  $('#new-toilet').on('submit', newToilet.submit);
};

newToilet.submit = function(event) {
  event.preventDefault();
  let toilet = {
    location: $('#location').val(),
    overallQuality: $('input[name=toilet]:checked', '#new-toilet').val(),
    tpQuality: $('input[name=tp]:checked', '#new-toilet').val(),
    usage: $('input[name=use]:checked', '#new-toilet').val(),
    occupancy: $('input[name=occupancy]:checked', '#new-toilet').val(),
    genderNeutral: $('input[name=gender]:checked', '#new-toilet').val(),
    soap: $('input[name=soap]:checked', '#new-toilet').val(),
    drying: $('input[name=drying]:checked', '#new-toilet').val(),
    comments: $('#comments').val(),
  }
  console.log(toilet);
}


  newToilet.handleForm();
  module.newToilet = newToilet;


})(app);
