var db = require('../db.js');
/*
 * TripJoin /trip API
 */
function success(result) {
	return result;
};

function error(err) {
	console.log(err);
	return false;
}

exports.collection = function () {
	return db.query('SELECT * FROM trip t INNER JOIN location l ON t.location_id = l.id').then(success,error);
};

exports.get = function (id) {
	return db.query('SELECT * FROM trip t INNER JOIN location l ON t.location_id = l.id WHERE id = ' + id).then(success,error);
};

exports.create = function(location_id, month, year, duration, budget, image_url, description) {
	var insert = 'INSERT INTO trip (location_id, month, year, duration, budget, image_url, description) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id',
	params = [location_id, month, year, duration, budget, image_url, description];
	return db.query(insert,params).then(success,error);
};

exports.edit = function(id, location_id, month, year, duration, budget, image_url, description) {
	var insert = 'UPDATE trip SET location_id = $2, month = $3, year = $4, duration = $5, budget = $6, image_url = $7, description = $8 WHERE id = $1',
	params = [id, location_id, month, year, duration, budget, image_url, description];
	return db.query(insert,params).then(success,error);
};

exports.delete = function(id) {
	var insert = 'DELETE FROM trip WHERE id = $1',
	params = [id];
	return db.query(insert,params).then(success,error);
};