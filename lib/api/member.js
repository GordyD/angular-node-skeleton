var db = require('../db.js');

/*
 * TripJoin  /member API
 */
function success(result) {
	return result;
};

function error(err) {
	console.log(err);
	return false;
}

exports.collection = function (req, res) {
	return db.query('SELECT * FROM member').then(success,error);
};

exports.get = function (id) {
	var id = req.params.id;
	return db.query('SELECT * FROM member WHERE id = ' + id).then(success,error);
};

exports.create = function(first_name, last_name, facebook_id, image_url) {
	var insert = 'INSERT INTO member (first_name, last_name, facebook_id, image_url) VALUES($1,$2,$3,$4) RETURNING id',
	params = [first_name, last_name, facebook_id, image_url];
	return db.query(insert,params).then(success,error);
};

exports.edit = function(id, first_name, last_name, facebook_id, image_url) {
	var insert = 'UPDATE member SET first_name = $2, last_name = $3, image_url = $4 WHERE id = $1',
	params = [id, first_name, last_name, facebook_id, image_url];
	return db.query(insert,params).then(success,error);
};

exports.delete = function(id) {
	var insert = 'DELETE FROM member WHERE id = $1',
	params = [id];
	return db.query(insert,params).then(success,error);
};