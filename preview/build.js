var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var htmlMinifier = require('html-minifier');
var uglifyJs = require('uglify-js');

function convertToSlug(Text) {return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');}



var cities = JSON.parse(fs.readFileSync('cities.json', 'utf8')).cities;

var cityTemplate = fs.readFileSync('city.template', 'utf8');

_.each(cities, function(city){
  var citySlug = convertToSlug(city.name);
  var cityPage = _.template(cityTemplate, {city: city, citySlug:citySlug});

  fs.writeFileSync('city/' + citySlug + '.html', cityPage, 'utf8');

});