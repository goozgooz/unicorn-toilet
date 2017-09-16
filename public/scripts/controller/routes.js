'use strict';

var app = app || {};

page('/', app.load.homePage);
page('/about', app.load.aboutPage);
page('/bored', app.load.boredPage);

page();
