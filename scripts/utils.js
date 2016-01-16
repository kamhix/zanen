window.chooseFile = function (name, callback) {
  var chooser = $(name);
  chooser.on("change", function() {
    callback(this.value);
  });

  chooser.click();
};

window.saveFile = function (name, callback) {
  var chooser = $(name);
  chooser.on("change", function() {
    callback(this.value);
  });

  chooser.click();
};
