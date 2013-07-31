var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var htmlMinifier = require('html-minifier');
var path = require('path');
function convertToSlug(Text) {return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');}



var cities = JSON.parse(fs.readFileSync('cities.json', 'utf8')).cities;

var cityTemplate = fs.readFileSync('city.template', 'utf8');

_.each(cities, function(city){
  var citySlug = convertToSlug(city.name);
  var cityPage = _.template(cityTemplate, {city: city, citySlug:citySlug});
  if(!fs.existsSync(citySlug)){
    fs.mkdirSync(citySlug);
  }
  fs.writeFileSync(citySlug + '/index.html', cityPage, 'utf8');

});
