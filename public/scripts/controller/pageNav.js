'use strict';

var app = app || {};

(function(module){
  const load = {};

  load.homePage = () => {
    $('.nav-links a').removeClass('active-link');
    $('.aboutUsAll').hide();
    $('.toilet-form').hide();
    $('.bored-main').hide();
    $('.mainContent').fadeIn();
    $('.homeLink').addClass('active-link');
    initIndexPage();
  }

  load.aboutPage = () => {
    $('.nav-links a').removeClass('active-link');
    $('.aboutUsAll').fadeIn();
    $('.mainContent').hide();
    $('.toilet-form').hide();
    $('.bored-main').hide();
    $('.aboutLink').addClass('active-link');
  }
  load.boredPage = () => {
    $('.nav-links a').removeClass('active-link');
    $('.bored-main').fadeIn();
    $('.aboutUsAll').hide();
    $('.mainContent').hide();
    $('.toilet-form').hide();
    $('.boredLink').addClass('active-link');
  }
  module.load = load;

})(app);
