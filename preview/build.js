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
/*
var packages = res.body.packages;
var indexTemplate = fs.readFileSync('index.template', 'utf8');
var indexPage = _.template(indexTemplate, {packages: packages});

var htmlCompressionOptions = {
	removeComments: true,
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
};

indexPage = htmlMinifier.minify(indexPage, htmlCompressionOptions);
indexPage = indexPage.replace('&nbsp;', ' ');

fs.writeFileSync('index.html', indexPage, 'utf8');
fs.writeFileSync('packages.json', JSON.stringify(res.body, null, 4), 'utf8');
fs.writeFileSync('packages.min.json', JSON.stringify(res.body), 'utf8');

var result = uglifyJs.minify(['cdnjs.handlebars.js', 'index.js']);
fs.writeFileSync('min.js', result.code, 'utf8');
*/
