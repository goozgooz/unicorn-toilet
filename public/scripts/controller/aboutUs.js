'use strict';
$( document ).ready(function() {
  $('.about-us').hide();
});
$('#aboutLink').on('click',function(){
  $('.about-us').fadeIn();
  $('#map').hide();
})
$('#homeLink').on('click',function(){
  $('#map').show();
    $('.about-us').fadeOut();
})
