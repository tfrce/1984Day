var path = require('path');
var fs = require('fs-extra');
var cleanCSS = require('clean-css');
var _ = require('lodash');
var glob = require('glob');
var cdn = 'http://cdn1984.taskforce.is';
var cdnversion = new Date().getTime();
var htmlMinifier = require('html-minifier');
var htmlCompressionOptions = {
  	removeComments: true,
  	collapseBooleanAttributes: true,
  	collapseWhitespace: true,
  };
function cssIncImages(cssFile) {
  var imgRegex = /url\s?\(['"]?(\.\.\/img.*?)\?embed(?=['"]?\))/gi;
  var css = fs.readFileSync(cssFile, 'utf-8');
  while (match = imgRegex.exec(css)) {
    var imgPath = path.join(path.dirname(cssFile), match[1]);
    try {
      var img = fs.readFileSync(imgPath, 'base64');
      var ext = imgPath.substr(imgPath.lastIndexOf('.') + 1);
      css = css.replace(match[1]+'?embed', 'data:image/' + ext + ';base64,' + img);
    } catch (err) {
      console.log('Image not found (%s).', imgPath);
    }
  }
   fs.writeFileSync(cssFile, css, 'utf-8'); // you can overwrite the original file with this line
  return css;
}
fs.copy('.', '..', function(err){
  if (err) {
    console.error(err);
  }
  else {
    var styles = fs.readFileSync('../css/styles.css', 'utf8');
    var minimized = cleanCSS.process(styles, {relativeTo: '../css'});
    fs.writeFileSync('../css/styles.css', minimized, 'utf8');
    //cssIncImages('../css/styles.css');
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
