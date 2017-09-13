'use strict';
$( document ).ready(function() {
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
});
$('#aboutLink').on('click',function(){
  $('.aboutUsAll').fadeIn();
  $('.mainContent').hide();
  $('.footer').hide();
  $('.toilet-form').hide();
})
$('#homeLink').on('click',function(){
    $('.aboutUsAll').hide();
    $('.footer').show();
    $('.mainContent').show();
})
