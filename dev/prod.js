var fs = require('fs-extra');
var cleanCSS = require('clean-css');
var _ = require('lodash');
var glob = require('glob');
glob("../**/index.html", {}, function (er, files) {
  var files = _.filter(files, function(file){
    return file.substr(0,6) !== '../dev' && file.substr(0, 13) !== '../index.html' && file.substr(0,7) !== '../node'
  });
console.log(files);
})
var cdn = 'http://1984cdn.taskforce.is';

fs.copy('.', '..', function(err){
  if (err) {
    console.error(err);
  }
  else {
    var styles = fs.readFileSync('../css/styles.css', 'utf8');
    var minimized = cleanCSS.process(styles, {relativeTo: '../css'});
    fs.writeFileSync('../css/styles.css', minimized, 'utf8');

    var indexPage = fs.readFileSync('../index.html', 'utf8');
    indexPage = indexPage.replace('css/styles.css',cdn+'/css/styles.css');
    fs.writeFileSync('../index.html', indexPage, 'utf8');
    console.log("success!")
  }
});
