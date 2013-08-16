var pg = require('pg'),
    when = require('when'),
    conString = "postgres://tripjoin_user:Tr1ppy@localhost:5432/tripjoin_db";

exports.query = function(query, params) {
  var deferred = when.defer();
  params = typeof params !== 'undefined' ? params : [];
  pg.connect(conString, function(err, client, done) {
    if(err) {
      deferred.reject(err);
    }
    client.query(query, params, function(err, result) {
      done();
      if(err) {
        deferred.reject(err);
      }
      deferred.resolve(result);
    });
  });

  return deferred.promise;
};