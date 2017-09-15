'use strict';

var app = app || {};

(function(module){
  const load = {};

  load.homePage = () => {
    $('.nav-links a').removeClass('active-link');
    $('.aboutUsAll').hide();
    $('.toilet-form').hide();
    $('.mainContent').fadeIn();
    $('.homeLink').addClass('active-link');
    initIndexPage();
  }

  load.aboutPage = () => {
    $('.nav-links a').removeClass('active-link');
    $('.aboutUsAll').fadeIn();
    $('.mainContent').hide();
    $('.toilet-form').hide();
    $('.aboutLink').addClass('active-link');
  }

  module.load = load;

})(app);
