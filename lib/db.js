var pg = require('pg'),
    when = require('when');  

var conString = "postgres://tripjoin_user:Tr1ppy@localhost:5432/tripjoin_db";

exports.query = function(query, params) {
  params = typeof params !== 'undefined' ? params : [];
  
  var deferred = when.defer();

  pg.connect(conString, function(err, client, done) {
    if(err) {
      deferred.reject(new Error('Error: Could not fetch client from pool', err));
    }
    client.query(query, params, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        deferred.reject(new Error('Error: Could not run query', err));
      }
      deferred.resolve(result.rows);
    });
  });

  return deferred.promise;
};