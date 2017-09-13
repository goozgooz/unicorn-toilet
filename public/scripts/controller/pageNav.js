'use strict';

$('#homeLink').ready(function() {
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
  $('.mainContent').fadeIn();
});

$('#homeLink').on('click', function() {
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
  $('.mainContent').fadeIn();
});

$('#aboutLink').on('click',function(){
  $('.aboutUsAll').fadeIn();
  $('.mainContent').hide();
  $('.toilet-form').hide();
});
