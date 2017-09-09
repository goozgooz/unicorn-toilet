'use strict';
$( document ).ready(function() {
  $('.aboutUsAll').hide();
});
$('#aboutLink').on('click',function(){
  $('.aboutUsAll').fadeIn();
  $('#map').hide();
  $('.footer').hide();
})
$('#homeLink').on('click',function(){
  $('#map').show();
    $('.aboutUsAll').hide();
    $('.footer').show();
})
