'use strict';
$( document ).ready(function() {
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
});
$('#aboutLink').on('click',function(){
  $('.mainContent #map').hide();
  $('.aboutUsAll').fadeIn();
  $('.toilet-form').hide();
})
$('#homeLink').on('click',function(){
    $('.aboutUsAll').hide();
    $('.mainContent #map').show();
})
