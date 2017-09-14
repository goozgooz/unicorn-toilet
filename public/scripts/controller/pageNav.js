'use strict';

$('.homeLink').ready(function() {
  $('.nav-links a').removeClass('active-link');
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
  $('.mainContent').fadeIn();
  $('.homeLink').addClass('active-link');
  app.Toilet.fetchData(loadMarkers);
});

$('.homeLink').on('click', function(){
  $('.nav-links a').removeClass('active-link');
  $('.aboutUsAll').hide();
  $('.toilet-form').hide();
  $('.mainContent').fadeIn();
  $('.homeLink').addClass('active-link');
    app.Toilet.fetchData(loadMarkers);
});

$('.aboutLink').on('click',function(){
  $('.nav-links a').removeClass('active-link');
  $('.aboutUsAll').fadeIn();
  $('.mainContent').hide();
  $('.toilet-form').hide();
  $('.aboutLink').addClass('active-link');
});
