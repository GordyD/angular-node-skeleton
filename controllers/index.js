
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.subpartials = function (req, res) {
  var name = req.params.name;
  var directory = req.params.directory;
  res.render('partials/' + directory + '/' + name);
};
