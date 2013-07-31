var fs = require('fs-extra');
fs.copy('.', '..', function(err){
  if (err) {
    console.error(err);
  }
  else {
    console.log("success!")
  }
});
