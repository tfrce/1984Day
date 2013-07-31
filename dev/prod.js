
var fs = require('fs-extra');
var cleanCSS = require('clean-css');
var _ = require('lodash');
var glob = require('glob');
//var cdn = 'http://1984cdn.taskforce.is';
var cdn = 'http://d3csjzoia27npz.cloudfront.net';
var cdnversion = new Date().getTime();
var htmlMinifier = require('html-minifier');
var htmlCompressionOptions = {
  	removeComments: true,
  	collapseBooleanAttributes: true,
  	collapseWhitespace: true,
  };

fs.copy('.', '..', function(err){
  if (err) {
    console.error(err);
  }
  else {
    var styles = fs.readFileSync('../css/styles.css', 'utf8');
    var minimized = cleanCSS.process(styles, {relativeTo: '../css'});
    fs.writeFileSync('../css/styles.css', minimized, 'utf8');

    var indexPage = fs.readFileSync('../index.html', 'utf8');
    indexPage = indexPage.replace('css/styles.css',cdn+'/css/styles.css?'+cdnversion);
    indexPage = htmlMinifier.minify(indexPage, htmlCompressionOptions);
    fs.writeFileSync('../index.html', indexPage, 'utf8');
    glob("../**/index.html", {}, function (er, files) {
      var files = _.filter(files, function(file){
        return file.substr(0,6) !== '../dev' && file.substr(0, 13) !== '../index.html' && file.substr(0,7) !== '../node'
      });
      _.each(files, function(filename){
        var indexPage = fs.readFileSync(filename, 'utf8');
        indexPage = indexPage.replace('../css/styles.css',cdn+'/css/styles.css?'+cdnversion);
        indexPage = htmlMinifier.minify(indexPage, htmlCompressionOptions);
        fs.writeFileSync(filename, indexPage, 'utf8');

      });
    })
    console.log("success!")
  }
});
