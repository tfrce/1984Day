var fs = require('fs-extra');
var cleanCSS = require('clean-css');


fs.copy('.', '..', function(err){
  if (err) {
    console.error(err);
  }
  else {
    var styles = fs.readFileSync('../css/styles.css', 'utf8');
    var minimized = cleanCSS.process(styles, {relativeTo: '../css'});
    fs.writeFileSync('../css/styles.css', minimized, 'utf8');
    console.log("success!")
  }
});
