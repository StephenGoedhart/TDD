var system = require('system');
var fs = require('fs');
var page = require('webpage').create();

//argument 0 is always the file which is called
if(system.args.length === 1){
  console.log("Pass the path/to/testfile.js as argument to run the test.");
  phantom.exit();
}else{
  var url = system.args[1];
  console.log("Opening " + url);
}

page.open(url, function(status){
  console.log("Status: " + status);
  if(status == "success"){
    setTimeout(function(){
      var path = "results.xml";
      var output = page.evaluate(function(){
        return document.output;
      });

      fs.write(path, output, 'w');
      console.log("Test finished. Exiting.");
      phantom.exit();
    }, 3000);
  } else{
    console.log("Failure opening" + url + ". ");
    phantom.exit();
  }
});
